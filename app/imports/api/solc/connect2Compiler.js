import axios from 'axios';

const agreement = {
  rent: 1500,
  homeowner: { address: '0x079297931812A6c0548572eA04dB157EA405D043',
    privateKey: '8bf0ba76e71cd5beda49110f700f6b833094ccf47a83f6be2254138a37367840' },
  tenants: {
    tenant1:
      { address: '0x3528D83F02fFe5B4B73370D002289ea1D1613BD3',
        privateKey: 'd54441086eb2f1ab5498b7d5ac9117d3b847ffc9717cff5df4af226fb6500970',
        period: 'monthly',
      },
  },
};

export async function postTest(contracts) {
  const payload = { data: JSON.stringify(agreement) };
  const result = await axios.post('http://167.172.38.37:9000', payload);
  const response = result.data;
  const abi = response.abi;
  const bytecode = response.bytecode;
  const tenants = agreement.tenants;
  contracts.push({
    homeowner: agreement.homeowner,
    abi: abi,
    bytecode: bytecode,
    tenants: tenants,
    rent: agreement.rent,
  });
}
