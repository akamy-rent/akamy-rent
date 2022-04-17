import axios from 'axios';

const agreement = {
  rent: 1500,
  homeowner: { address: '0x44159eb5b0847358C2f0EA61466f936D4AE29359',
    privateKey: 'df5e70a88737c39f37a5af4f919ccad7096df8ffd35b35905de2f83570c7ec4e' },
  tenants: {
    tenant1:
      { address: '0x5385F6e41055ec7d60aA1A32c0dbf92bfd1b1252',
        privateKey: 'a0e3eaab0cc2b362cc34a68aa537fb3add53fa4b80eb4c4ac33055f3dd6240ba',
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
