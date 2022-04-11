import { ethers } from 'ethers';

const nodeUrl = 'http://localhost:8545';

// A Provider is an abstraction of a connection to the Ethereum network, providing a concise, consistent interface to standard Ethereum node functionality.
const provider = new ethers.providers.JsonRpcProvider(nodeUrl);


