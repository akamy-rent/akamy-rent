import React from 'react';
import { Container, Header, Button } from 'semantic-ui-react';

/** Test page to compile a smart contract with the python script and */
class TestContract extends React.Component {

  render() {
    return (
      <Container id={'test-contract-page'}>
        <Header as="h2" textAlign="center">Contract Tester</Header>
        <Button id={'compile'} color={'red'}>Compile Smart contract</Button>
        <Button id={'deploy'} color={'blue'}>Deploy Smart contract</Button>
        <Button id={'test'} color={'green'}>Test Smart contract</Button>
        <Button id={'show-transactions'} color={'orange'}>Show transaction log</Button>
      </Container>
    );
  }
}

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default TestContract;
