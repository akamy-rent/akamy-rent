import axios from 'axios';

const agreement = {
  rent: 1500,
  homeowner: { address: '0xe1D7cccdEDDd47aa5Ebe78Bf7F067E9455E00668',
    privateKey: 'be9f5b8e8059c5a1f8d6c4a588e99fdbb7f39f1dd00dd3fa2d62914b319af4db' },
  tenants: {
    tenant1:
      { address: '0x4017685CE2d932837910bFbc308c11bE641950Fa',
        privateKey: '6204acfff010d56c139c320e187ca917bd3b83ee00f6ad3168bfb3613c84adb6',
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
