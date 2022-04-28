import axios from 'axios';

const agreement = {
  rent: 1500,
  homeowner: { name: 'Bill',
    address: '0x3344587E78161B9DfC44a893bC46657884ADd2B8',
    privateKey: '435ec668288cc794b81ee9ee173317fa1c3531020811bbe39066e8c2e2099574' },
  tenants: [{ name: 'Bob',
    address: '0xCC1625e061aCeF77aE75cFeC46B92a52ae777652',
    privateKey: '2e12c3399bfd2b9cb93e787bc9d729e85738dbdf21a3ff5a9bee14419b5a3ce9',
    period: 'seconds',
  }],
};

export async function createAndCompileContract(contracts) {
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
