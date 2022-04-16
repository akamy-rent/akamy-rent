import axios from 'axios';

const agreement = {
  rent: 1,
  homeowner: { address: '0x959Ad1AF2f079d08F534c9d8B60d35df8745d644',
    privateKey: '89e42d2efdaae351f9af897072c05d7b74e536ddaef471d6e09b0af4446bb8d1'},
  tenants: {
    tenant1:
      { address: '0x345e88d7CCE66C3539c9BF1E53B1F111cE327acd',
        privateKey: '594e4b976ac677792409eeb1db99498f09ad91804f2cb1954b33287e13b6aeb1',
        period: 'monthly',
      },
  },
};

export async function postTest(contracts) {
  const payload = { data: JSON.stringify(agreement) };
  const result = await axios.post('http://localhost:9000', payload);
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
