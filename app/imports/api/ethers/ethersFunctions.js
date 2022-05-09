import { Meteor } from 'meteor/meteor';
import ethers from 'ethers';
import moment from 'moment';
import { determineTotalPayments, determineNextPayment, saveTransactionForRecord } from '../utilities/transactionUtils';

const ganacheCheck = () => new Promise((resolve, reject) => {
  Meteor.call('getGanacheURL', function (error, result) {
    if (error) {
      return reject(error);
    }
    return resolve(result);
  });
});

function ganacheCheckSuccess(result) {
  const nodeUrl = result;
  if (!nodeUrl) {
    return {
      provider: undefined,
      ganacheExists: false,
    };
  }
  const provider = new ethers.providers.JsonRpcProvider(nodeUrl);
  return {
    provider,
    ganacheExists: true,
  };
}

function ganacheCheckFail(error) {
  console.log(error);
}

export function loadProviderError(error) {
  console.log(`Provider not loaded ${error}`);
}

export async function loadProvider() {
  const value = await ganacheCheck().then(ganacheCheckSuccess, ganacheCheckFail);
  console.log(value);
  return value;
}

export async function deployContract(contract, provider) {
  console.log('deploying contract');
  // contract variables
  const deployedContract = contract;
  const abi = contract.abi;
  const bytecode = contract.bytecode;
  console.log(contract.homeowner);
  const homeownerAddress = contract.homeowner.address;

  // building contract instance
  const signer = provider.getSigner(homeownerAddress);
  const factory = new ethers.ContractFactory(abi, bytecode, signer);
  const contractInstance = await factory.deploy();
  const startEth = ethers.utils.parseUnits('1.0', 'mwei');
  const tx = { to: contractInstance.address, value: startEth };
  const wallet = new ethers.Wallet(contract.homeowner.privateKey, provider);

  // Transaction log string
  deployedContract.transactionLog = [];
  const currentDate = moment();
  const deploymentString = `Smart contract deployed on ${contractInstance.address}`;
  saveTransactionForRecord(deployedContract.transactionLog, currentDate, deploymentString);

  // need to give contract some money to send transaction
  await wallet.signTransaction(tx);
  await wallet.sendTransaction(tx);
  console.log(`Contract found at ${contractInstance.address}`);
  return contractInstance.address;
}

function payRent(contract, currentD, provider) {
  // initialize variables
  const tenant = contract.tenant;
  const tenantAddress = tenant.address;
  const contractAddress = contract.address;
  const homeownerAddress = contract.homeowner.address;

  // 1 eth to every $3000 * 12 monthly payments
  const dollarToEth = (contract.rent / 3000) * 12;
  // every rent payment done every period
  const payments = determineTotalPayments(tenant.period);
  const ethPerPayment = dollarToEth / payments;
  // Ether per period
  const rentEth = ethers.utils.parseEther(ethPerPayment.toString());

  // strings for logs and time format
  const tenantToContract = `Tenant address: ${tenantAddress} paid ${rentEth} wei to contract at: ${contractAddress}`;
  const contractToHomeowner = `Rent paid contract at ${contractAddress} paid ${rentEth} wei to Homeowner: ${homeownerAddress}`;
  //  tenant is new signer of next contract call
  console.log(`inside pay rent ${provider}`);
  const signer = provider.getSigner(tenant.address);
  console.log(`after signer is created  ${signer}`);
  // create new contract instance
  const contractInstance = new ethers.Contract(contract.address, contract.abi, signer);
  saveTransactionForRecord(contract.transactionLog, currentD, tenantToContract);
  // call contract to pay rent
  contractInstance.payRent(contract.homeowner.address, { value: rentEth });
  saveTransactionForRecord(contract.transactionLog, currentD, contractToHomeowner);
}

export async function destroyContract(contract, provider) {
  //  tenant is new signer of next contract call
  const signer = provider.getSigner(contract.homeowner.address);
  const contractInstance = new ethers.Contract(contract.address, contract.abi, signer);
  contractInstance.close();
}

export async function payRentScheduler(contract, provider) {
  // Initialize variables
  const dateDeployed = moment();
  let nextPaymentDate = null;
  let currentDate = dateDeployed;
  const tenant = contract.tenant;
  const tenantPayPeriod = tenant.period;
  let finalPaymentDate = null;
  let counter = 1;
  const destroyString = `Contract at ${contract.address} destroyed`;

  finalPaymentDate = moment(dateDeployed).add('1', 'year');

  // used for debugging
  if (tenantPayPeriod === 'seconds') {
    finalPaymentDate = moment(dateDeployed).add('10', 'seconds');
  }

  // interval function
  const paymentInterval = function () {

    currentDate = nextPaymentDate;
    if (moment(currentDate).isBefore(moment(finalPaymentDate))) {
      nextPaymentDate = determineNextPayment(tenantPayPeriod, currentDate);
      counter++;
      // pay the rent
      console.log(`Transaction ${counter}`);
      payRent(contract, currentDate, provider);
      setTimeout(paymentInterval, moment(nextPaymentDate).diff(currentDate));
    } else {
      // final payment, destroy the contract
      saveTransactionForRecord(contract.transactionLog, moment(currentDate).format(), destroyString);
      destroyContract(contract, provider);
    }
  };

  // run the recursive timeout
  payRent(contract, currentDate, provider);
  console.log(`Transaction ${counter}`);
  nextPaymentDate = determineNextPayment(tenantPayPeriod, currentDate);
  if (nextPaymentDate === null) {
    console.log('error: nextPaymentDate not set, rent not paid');
  } else {
    setTimeout(paymentInterval, moment(nextPaymentDate).diff(moment(currentDate)));
  }
}

export async function contractCheck(contract) {
  const provider = loadProvider();
  const result = await provider.getCode(contract.address);
  console.log(result);
}
