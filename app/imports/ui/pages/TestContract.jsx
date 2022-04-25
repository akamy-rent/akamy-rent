import React from 'react';
import { Container, Header, Button } from 'semantic-ui-react';
import { postTest } from '../../api/solc/connect2Compiler';
import { deployContract, payRentScheduler } from '../../api/ethers/ethersFunctions';
import { showTransactions } from '../../api/utilities/transactionUtils';

const contracts = [];
const deployedContracts = [];

/** Test page to compile a smart contract with the python script and */
class TestContract extends React.Component {
  compileButton() {
    postTest(contracts);
  }

  deployButton() {
    deployedContracts.push(deployContract(contracts[0]));
  }

  callContractButton() {
    payRentScheduler(contracts[0]);
  }

  showTransactions() {
    showTransactions(contracts[0]);
  }

  render() {
    return (
      <Container id={'test-contract-page'}>
        <Header as="h2" textAlign="center">Contract Tester</Header>
        <Button id={'compile'} color={'red'} onClick={this.compileButton}>Compile Smart contract</Button>
        <Button id={'deploy'} color={'blue'} onClick={this.deployButton}>Deploy Smart contract</Button>
        <Button id={'test'} color={'green'} onClick={this.callContractButton}>Test Smart contract</Button>
        <Button id={'show-transactions'} color={'orange'} onClick={this.showTransactions}>Show transaction log</Button>
      </Container>
    );
  }
}

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default TestContract;
