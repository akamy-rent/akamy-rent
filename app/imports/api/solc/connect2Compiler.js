import axios from 'axios';

export async function createAndCompileContract(contract) {
  let ok = true;
  const payload = { data: JSON.stringify(contract) };
  const result = await axios.post('http://206.189.2.161:9000', payload).catch((error) => { console.log(error); ok = false; });
  if (ok) {
    return result;
  }
  return false;
}
