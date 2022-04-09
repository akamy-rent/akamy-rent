// import { ethers } from 'ethers';

const path = require('path');
const fs = require('fs');
const solc = require('solc');

// const nodeUrl = 'http://localhost:8545';
export function printContract() {
  const input = {
    language: 'Solidity',
    sources: {
      'test.sol': {
        content: 'contract C { function f() public { } }',
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  };

  const output = JSON.parse(solc.compile(JSON.stringify(input)));

  // `output` here contains the JSON output as specified in the documentation

  for (const contractName in output.contracts['test.sol']) {
    console.log(
      `${contractName
      }: ${
        output.contracts['test.sol'][contractName].evm.bytecode.object}`,
    );
  }
}

// A Provider is an abstraction of a connection to the Ethereum network, providing a concise, consistent interface to standard Ethereum node functionality.
// const nodeConnection = new ethers.providers.JsonRpcProvider(nodeUrl);
