// import { ethers } from 'ethers';

const path = require('path');
const fs = require('fs');
const solc = require('solc');

// const nodeUrl = 'http://localhost:8545';
const greeterPath = path.resolve(__dirname, 'contracts', 'greeter.sol');
const source = fs.readFileSync(greeterPath, 'UTF-8');

console.log(solc.compile(source, 1));

// A Provider is an abstraction of a connection to the Ethereum network, providing a concise, consistent interface to standard Ethereum node functionality.
// const nodeConnection = new ethers.providers.JsonRpcProvider(nodeUrl);
