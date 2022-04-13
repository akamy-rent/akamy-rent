import React from 'react';
import { Container, Header, Button } from 'semantic-ui-react';
import { postTest } from '../../api/solc/connect2Compiler';
import { deployContract } from '../../api/ethers/ethersFunctions';

let contracts = [];

/** Test page to compile a smart contract with the python script and */
class TestContract extends React.Component {
  submitButton() {
    postTest(contracts);
  }

  checkButton() {
    deployContract(contracts);
    contracts = [];
  }

  render() {
    return (
      <Container>
        <Header as="h2" textAlign="center">Contract Tester</Header>
        <Button color={'red'} onClick={this.submitButton}>Click me first</Button>
        <Button color={'blue'} onClick={this.checkButton}>Click me second</Button>
      </Container>
    );
  }
}

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default TestContract;
