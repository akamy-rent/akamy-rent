import axios from 'axios';

export async function postTest() {
  const payload = { data: 'pragma solidity >0.5.0;contract Greeter {string public greeting;constructor() public {greeting = \'Hello\';}function setGreeting(string memory _greeting) public {greeting = _greeting;}function greet() view public returns (string memory){return greeting;}}'};
  const result = await axios.post('http://localhost:9000', payload);
  const response = result.data;
  const abi = response["abi"];
  const bytecode = response["bytecode"];
}
