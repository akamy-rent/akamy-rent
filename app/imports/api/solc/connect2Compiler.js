import axios from 'axios';

const agreement = {
  rent: 1500,
  homeowner: { address: '0xefA52122A3b71Ca633A0d71762D65CBc3823e9f7',
    privateKey: '8ae558f157a45bfcf0a99fa16cade7f92ca622d7206e4cb53f14774eb40c255c' },
  tenants: [{ address: '0xFffFF590B16b5C1f569C7A63Cde274905A37ee67',
    privateKey: 'a25f1099569dd7c2b973669a63834894b9718e09b74647e45f2352dbec7d3d39',
    period: 'seconds',
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
