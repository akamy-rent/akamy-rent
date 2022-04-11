import ethers from 'ethers';

const nodeUrl = 'http://localhost:8545';

export function deployContract(contracts) {
  const contract = contracts[0];
  const abi = contract.abi;
  const bytecode = contract.bytecode;
  // A Provider is an abstraction of a connection to the Ethereum network, providing a concise, consistent interface to standard Ethereum node functionality.
  // const mnemonic = 'seed smoke fade lunar lounge bunker member bargain layer wear garlic win';
  // const wallet = new ethers.Wallet.fromMnemonic(mnemonic);
  const provider = new ethers.providers.JsonRpcProvider(nodeUrl);
  const signer = provider.getSigner(0);
  const factory = new ethers.ContractFactory(abi, bytecode, signer);
}

