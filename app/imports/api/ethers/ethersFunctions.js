import ethers from 'ethers';

const nodeUrl = 'http://localhost:8545';
const provider = new ethers.providers.JsonRpcProvider(nodeUrl);

export async function deployContract(contract) {
  // contract variables
  const deployedContract = contract;
  const abi = contract.abi;
  const bytecode = contract.bytecode;
  const homeownerAddress = contract.homeowner.address;

  // building contract instance
  const signer = provider.getSigner(homeownerAddress);
  const factory = new ethers.ContractFactory(abi, bytecode, signer);
  const contractInstance = await factory.deploy();
  deployedContract.address = contractInstance.address;
  deployedContract.homeowner.signer = signer;
  const rentEth = ethers.utils.parseEther('1');
  const tx = { to: contractInstance.address, value: rentEth };
  const wallet = new ethers.Wallet(contract.homeowner.privateKey, provider);

  // need to give contract some money to send transaction
  wallet.signTransaction(tx);
  wallet.sendTransaction(tx);
}

export async function payRent(contract) {
  const tenants = contract.tenants;
  const tenant = tenants.tenant1;
  const dollarToEth = (contract.rent / 3000);
  const rentEth = ethers.utils.parseEther(dollarToEth.toString());
  const signer = provider.getSigner(tenant.address);
  const contractInstance = new ethers.Contract(contract.address, contract.abi, signer);
  contractInstance.payRent(contract.homeowner.address, { value: rentEth });
  const contractBalance = await provider.getBalance(contract.address);
  console.log(`eth in contract: ${ethers.utils.formatUnits(contractBalance)}`);
}

export async function destroyContract(contract) {
  const contractInstance = new ethers.Contract(contract.address, contract.abi, contract.homeowner.signer);
  contractInstance.close();
}

export async function contractCheck(contract) {
  const result = await provider.getCode(contract.address);
  console.log(result);
}

function myTimer(contract) {
}

setInterval(myTimer, 1000);
