import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { SmartContracts } from '../../../api/smartContract/SmartContract';
import SmartContractItemAdmin from '../../components/smart-contract/SmartContractItemAdmin';

/** Renders a table containing all of the SmartContract documents. Use <SmartContractItem> to render each row. */
class ListSmartContractAdmin extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <br/>
        <Header as="h2" textAlign="center">List Smart Contracts (Homeowner)</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
              <Table.HeaderCell>Stance</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.smartContracts.map((smartContract) => <SmartContractItemAdmin key={smartContract._id} smartContract={smartContract} />)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

// Require an array of SmartContract documents in the props.
ListSmartContractAdmin.propTypes = {
  smartContracts: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to SmartContract documents.
  const subscription = Meteor.subscribe(SmartContracts.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the SmartContract documents
  const smartContracts = SmartContracts.collection.find({}).fetch();
  return {
    smartContracts,
    ready,
  };
})(ListSmartContractAdmin);
