import axios from 'axios';

const contractString = 'pragma solidity >= 0.7.0;contract Greeter{string private _greeting = "Hello, World!";function greet() external pure returns(string memory) {return "Hello, World!";}}';

export async function postTest(contracts) {
  const payload = { data: contractString };
  const result = await axios.post('http://localhost:9000', payload);
  const response = result.data;
  const abi = response.abi;
  const bytecode = response.bytecode;
  contracts.push({ abi, bytecode });
}
