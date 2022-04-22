import React from 'react';
import { Container, Header, Button } from 'semantic-ui-react';
import { postTest } from '../../api/solc/connect2Compiler';
import { deployContracts, contractCheck, payRentFunction } from '../../api/ethers/ethersFunctions';

let contracts = [];
const deployedContracts = [];

/** Test page to compile a smart contract with the python script and */
class TestContract extends React.Component {
  compileButton() {
    postTest(contracts);
  }

  deployButton() {
    deployedContracts.push(deployContracts(contracts[0]));
  }

  callContractButton() {
    payRentFunction(contracts[0]);
  }

  checkContract() {
    contractCheck();
    contracts = [];
  }

  render() {
    return (
      <Container>
        <Header as="h2" textAlign="center">Contract Tester</Header>
        <Button color={'red'} onClick={this.compileButton}>Compile Smart contract</Button>
        <Button color={'blue'} onClick={this.deployButton}>Deploy Smart contract</Button>
        <Button color={'green'} onClick={this.callContractButton}>Test Smart contract</Button>
        <Button color={'purple'} onClick={this.destroyContractButton}>Check Contract</Button>
      </Container>
    );
  }
}

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default TestContract;
