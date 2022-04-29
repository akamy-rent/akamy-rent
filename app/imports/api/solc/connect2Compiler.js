import axios from 'axios';

export async function createAndCompileContract(contract) {
  console.log('deploying contract');
  const payload = { data: JSON.stringify(contract) };
  return axios.post('http://206.189.2.161:9000', payload);
}
