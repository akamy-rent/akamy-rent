import axios from 'axios';

const contractString = 'pragma solidity >= 0.4.0;contract Hello {string public message;function Hello (string initialMessage) public { message = initialMessage;}function setMessage (string newMessage) public {message = newMessage;}}';

export async function postTest(contracts) {
  const payload = { data: contractString };
  const result = await axios.post('http://localhost:9000', payload);
  const response = result.data;
  const abi = response.abi;
  const bytecode = response.bytecode;
  contracts.push({ abi, bytecode });
}
