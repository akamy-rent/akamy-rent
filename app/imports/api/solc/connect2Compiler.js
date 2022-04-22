import axios from 'axios';

const agreement = {
  rent: 1500,
  homeowner: { address: '0x58bD3afa6e37920C431bf61e9c13bf1c51569da5',
    privateKey: '72b3124d8375e65f9fd83bc397c0acf6fa859572ade22a64e5abdf372b94d061' },
  tenants: [{ address: '0x41519F7422eD8Db250570d8eA2CF1F077b1A530b',
    privateKey: '0555c583cdc7db530ad9e49c342e34197fc4f4b1e8d528c2ef618244839f13d3',
    period: 'monthly',
  }],
};

export async function postTest(contracts) {
  const payload = { data: JSON.stringify(agreement) };
  const result = await axios.post('http://206.189.2.161:9000', payload);
  const response = result.data;
  const abi = response.abi;
  const bytecode = response.bytecode;
  const tenants = agreement.tenants;
  console.log(bytecode);
  contracts.push({
    homeowner: agreement.homeowner,
    abi: abi,
    bytecode: bytecode,
    tenants: tenants,
    rent: agreement.rent,
  });
}
