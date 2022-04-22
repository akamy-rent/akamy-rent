import ethers from 'ethers';
import moment from 'moment';

function loadProvider() {
  const nodeUrl = 'http://localhost:8545';
  const provider = new ethers.providers.JsonRpcProvider(nodeUrl);
  return provider;
}

export async function deployContracts(contract) {
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

  // need to give contract some money to send transaction
  wallet.signTransaction(tx);
  wallet.sendTransaction(tx);

  console.log(`Contract found at ${contractInstance.address}`);
}

function determineTotalPayments(tPayPeriod) {
  const now = moment();
  let totalPayments = 0;
  // update next pay period
  switch (tPayPeriod) {
  case 'months':
    totalPayments = moment(now).diff(moment(now).add('1', 'year'), 'month');
    break;
  case 'weeks':
    totalPayments = moment(now).diff(moment(now).add('1', 'year'), 'week');
    break;
  case 'seconds':
    totalPayments = 10;
    break;
  default:
    console.log(`${tPayPeriod} is not a proper response`);
  }
  return totalPayments;
}

function payRent(contract) {
  const tenant = contract.tenants[0];
  // 1 eth to every $3000
  const dollarToEth = (contract.rent / 3000);
  // every rent payment done every period
  const payments = determineTotalPayments(tenant.period);
  const ethPerPayment = dollarToEth / payments;
  const rentEth = ethers.utils.parseEther(ethPerPayment.toString());

  // load provider
  const provider = loadProvider();
  //  tenent is new signer of next contract call
  const signer = provider.getSigner(tenant.address);
  // create new contract instance
  const contractInstance = new ethers.Contract(contract.address, contract.abi, signer);
  // call contract to pay rent
  contractInstance.payRent(contract.homeowner.address, { value: rentEth });
}

export async function destroyContract(contract) {
  const contractInstance = new ethers.Contract(contract.address, contract.abi, contract.homeowner.signer);
  contractInstance.close();
}

function determineNextPayment(tPayPeriod, currentD) {
  let nextPaymentDate = null;
  // update next pay period
  switch (tPayPeriod) {
  case 'months':
    nextPaymentDate = moment(currentD).add('1', 'month');
    break;
  case 'weeks':
    nextPaymentDate = moment(currentD).add('1', 'week');
    break;
  case 'seconds':
    nextPaymentDate = moment(currentD).add('1', 'seconds');
    break;
  default:
    console.log(`${tPayPeriod} is not a proper response`);
  }
  return nextPaymentDate;
}

export async function payRentFunction(contract) {
  // Initialize variables
  const dateDeployed = moment();
  let nextPaymentDate = null;
  let currentDate = dateDeployed;

  const tenantPayPeriod = contract.tenants[0].period;
  const finalPaymentDate = moment(dateDeployed).add('1', 'year');

  // interval function
  const paymentInterval = function () {
    currentDate = nextPaymentDate;
    if (moment(currentDate).isBefore(moment(finalPaymentDate))) {
      nextPaymentDate = determineNextPayment(tenantPayPeriod, currentDate);
      // pay the rent
      payRent(contract);
      setTimeout(paymentInterval, moment(nextPaymentDate).diff(currentDate));
    } else {
      // final payment, destroy the contract
      payRent(contract);
      destroyContract(contract);
    }
  };

  // run the recursive timeout
  nextPaymentDate = determineNextPayment(tenantPayPeriod, currentDate);
  setTimeout(paymentInterval, moment(nextPaymentDate).diff(moment(currentDate)));
}

export async function contractCheck(contract) {
  const provider = loadProvider();
  const result = await provider.getCode(contract.address);
  console.log(result);
}
