import ethers from 'ethers';

const nodeUrl = 'http://localhost:8545';

export async function deployContract(contracts) {
  const contract = contracts[0];
  const abi = contract.abi;
  const bytecode = contract.bytecode;
  const provider = new ethers.providers.JsonRpcProvider(nodeUrl);
  const signer = provider.getSigner(0);
  const factory = new ethers.ContractFactory(abi, bytecode, signer);
  const contractInstance = await factory.deploy();
  console.log(contractInstance.address, contractInstance.deployTransaction);
  await contractInstance.deployTransaction.wait();
  console.log(await contractInstance.greet());
}
