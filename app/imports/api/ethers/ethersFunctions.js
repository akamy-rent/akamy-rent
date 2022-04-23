import ethers from 'ethers';
import moment from 'moment';
import { determineTotalPayments, determineNextPayment, saveTransactionForRecord } from '../utilities/transactionUtils';

function loadProvider() {
  const nodeUrl = 'http://localhost:8545';
  const provider = new ethers.providers.JsonRpcProvider(nodeUrl);
  return provider;
}

export async function deployContract(contract) {
  console.log('deploying contract');
  // contract variables
  const deployedContract = contract;
  const abi = contract.abi;
  const bytecode = contract.bytecode;
  const homeownerAddress = contract.homeowner.address;
  const provider = loadProvider();

  // building contract instance
  const signer = provider.getSigner(homeownerAddress);
  const factory = new ethers.ContractFactory(abi, bytecode, signer);
  const contractInstance = await factory.deploy();
  deployedContract.address = contractInstance.address;
  deployedContract.homeowner.signer = signer;
  const startEth = ethers.utils.parseUnits('1.0', 'mwei');
  const tx = { to: contractInstance.address, value: startEth };
  const wallet = new ethers.Wallet(contract.homeowner.privateKey, provider);

  // Transaction log string
  deployedContract.transactionLog = [];
  const currentDate = moment();
  const deploymentString = `Smart contract deployed on ${contractInstance.address}`;
  saveTransactionForRecord(deployedContract.transactionLog, currentDate, deploymentString);

  // need to give contract some money to send transaction
  wallet.signTransaction(tx);
  wallet.sendTransaction(tx);

  console.log(`Contract found at ${contractInstance.address}`);
}

function payRent(contract, currentD) {
  // initialize variables
  const tenant = contract.tenants[0];
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

  // load provider
  const provider = loadProvider();
  //  tenent is new signer of next contract call
  const signer = provider.getSigner(tenant.address);
  // create new contract instance
  const contractInstance = new ethers.Contract(contract.address, contract.abi, signer);
  saveTransactionForRecord(contract.transactionLog, currentD, tenantToContract);
  // call contract to pay rent
  contractInstance.payRent(contract.homeowner.address, { value: rentEth });
  saveTransactionForRecord(contract.transactionLog, currentD, contractToHomeowner);
}

export async function destroyContract(contract) {
  const contractInstance = new ethers.Contract(contract.address, contract.abi, contract.homeowner.signer);
  contractInstance.close();
}

export async function payRentScheduler(contract) {
  // Initialize variables
  const dateDeployed = moment();
  let nextPaymentDate = null;
  let currentDate = dateDeployed;
  const tenant = contract.tenants[0];
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
      payRent(contract);
      setTimeout(paymentInterval, moment(nextPaymentDate).diff(currentDate));
    } else {
      // final payment, destroy the contract
      saveTransactionForRecord(contract.transactionLog, moment(currentDate).format(), destroyString);
      destroyContract(contract);
    }
  };

  // run the recursive timeout
  payRent(contract, currentDate);
  console.log(`Transaction ${counter}`);
  nextPaymentDate = determineNextPayment(tenantPayPeriod, currentDate);
  setTimeout(paymentInterval, moment(nextPaymentDate).diff(moment(currentDate)));
}

export async function contractCheck(contract) {
  const provider = loadProvider();
  const result = await provider.getCode(contract.address);
  console.log(result);
}
