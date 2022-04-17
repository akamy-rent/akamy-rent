import axios from 'axios';

const agreement = {
  rent: 1500,
  homeowner: { address: '0x88671e92E9205243da72583b2ac72BbE92cC1a1C',
    privateKey: 'cf7ac640e222dc2d4dd15eabf7c50a4b8908184285fac4e94124a54e4877d6f3' },
  tenants: {
    tenant1:
      { address: '0x2643fD7e0bc93De85871336308f788b636353f4B',
        privateKey: 'c7ba2b017aeed4b1f8cca710f2c92e95d0a34f4aed0d5e2c0ebe2b80e4680953',
        period: 'monthly',
      },
  },
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
