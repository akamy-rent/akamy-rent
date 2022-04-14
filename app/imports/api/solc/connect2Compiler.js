import axios from 'axios';

const data = {
  homeowner: { address: '0xCBFC0B52BD2918b7735dbF5AD91E2236eFA9F9EB' },
  tenants: {
    tenant1:
      { address: '0xAdefD842Eb581b115cD7Bf25345b60A7b38d2eEa',
        period: 'monthly',
      },
    tenant2:
      { address: '0xAdefD842Eb581b115cD7Bf25345b60A7b38d2eEa',
        period: 'monthly',
      },
  },
};
export async function postTest(contracts) {
  const payload = { data: JSON.stringify(data) };
  const result = await axios.post('http://localhost:9000', payload);
  const response = result.data;
  const abi = response.abi;
  const bytecode = response.bytecode;
  contracts.push({ abi, bytecode });
}
