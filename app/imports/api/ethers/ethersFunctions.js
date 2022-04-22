import ethers from 'ethers';

function loadProvider() {
  const nodeUrl = 'http://localhost:8545';
  const provider = new ethers.providers.JsonRpcProvider(nodeUrl);
  return provider;
}

export async function deployContract(contract) {
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
  const rentEth = ethers.utils.parseEther('1');
  const tx = { to: contractInstance.address, value: rentEth };
  const wallet = new ethers.Wallet(contract.homeowner.privateKey, provider);

  // need to give contract some money to send transaction
  wallet.signTransaction(tx);
  wallet.sendTransaction(tx);
}

function payRent(contract) {
  const tenant = contract.tenants[0];
  const dollarToEth = (contract.rent / 3000);
  const rentEth = ethers.utils.parseEther(dollarToEth.toString());

  // load provider
  const provider = loadProvider();
  //  tenent is new signer of next contract call
  const signer = provider.getSigner(tenant.address);
  // create new contract instance
  const contractInstance = new ethers.Contract(contract.address, contract.abi, signer);
  // call contract to pay rent
  contractInstance.payRent(contract.homeowner.address, { value: rentEth });
}

export async function payRentWrapper(contract) {
  let intervalId = null;
  let varCounter = 0;
  const varName = function () {
    if (varCounter <= 5) {
      varCounter++;
      payRent(contract);
    } else {
      clearInterval(intervalId);
    }
  };
  intervalId = setInterval(varName, 1000);
}

export async function destroyContract(contract) {
  const contractInstance = new ethers.Contract(contract.address, contract.abi, contract.homeowner.signer);
  contractInstance.close();
}

export async function contractCheck(contract) {
  const provider = loadProvider();
  const result = await provider.getCode(contract.address);
  console.log(result);
}
