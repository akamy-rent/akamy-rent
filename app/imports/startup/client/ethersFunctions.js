import ethers from 'ethers';

const nodeUrl = 'http://localhost:8545';

export async function deployContract(contracts) {
  const contract = contracts[0];
  console.log(contract);
  const abi = contract.abi;
  console.log(abi);
  const bytecode = contract.bytecode;
  console.log(bytecode);
  const provider = new ethers.providers.JsonRpcProvider(nodeUrl);
  const signer = provider.getSigner(0);
  const factory = new ethers.ContractFactory(abi, bytecode, signer);
  const contractInstance = await factory.deploy();
  console.log(contractInstance.address, contractInstance.deployTransaction);
  await contractInstance.deployTransaction.wait();
  console.log(await contractInstance.greet());
}
