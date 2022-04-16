import ethers from 'ethers';
import lodash from 'lodash';

const _ = lodash;
const nodeUrl = 'http://localhost:8545';
const provider = new ethers.providers.JsonRpcProvider(nodeUrl);

export async function deployContract(contract) {
  const deployedContract = contract;
  const abi = contract.abi;
  // console.log(abi);
  const bytecode = contract.bytecode;
  // console.log(bytecode);
  const homeownerAddress = contract.homeowner.address;
  const signer = provider.getSigner(homeownerAddress);
  const factory = new ethers.ContractFactory(abi, bytecode, signer);
  const contractInstance = await factory.deploy();
  // console.log(contractInstance.address, contractInstance.deployTransaction);
  deployedContract.address = contractInstance.address;
  const tx = { to: contractInstance.address, value: ethers.utils.parseEther('5') };
  const wallet = new ethers.Wallet(contract.homeowner.privateKey, provider);
  wallet.signTransaction(tx);
  wallet.sendTransaction(tx);
}

export async function pay_rent(contract) {
  const tenants = contract.tenants;
  // const tenant = tenants.tenant1;
  // const tx = { to: contract.address.toString(), value: ethers.utils.parseEther(contract.rent.toString()) };
  // console.log(tenants);
  // const wallets = _.map(tenants, (tenant) => new ethers.Wallet(tenant.address, provider));
  // _.map(wallets, (wallet) => { wallet.signTransaction(tx); wallet.sendTransaction(tx); });
  // pay the smart contract
  // const wallet = new ethers.Wallet(tenant.privateKey, provider);
  // wallet.signTransaction(tx);
  // wallet.sendTransaction(tx);
  const signer = provider.getSigner(contract.homeowner.address);
  const contractInstance = new ethers.Contract(contract.address, contract.abi, signer);
  // const contractBalance = await provider.getBalance(contract.address);
  // console.log(ethers.utils.formatEther(contractBalance));
  console.log(contractInstance.interface);
  console.log(contract.homeowner.address);
  contractInstance.payRent(contract.homeowner.address);
  // run the smart contract
}
