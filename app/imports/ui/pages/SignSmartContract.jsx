import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Loader, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SignSmartContractItem from '../components/SignSmartContractItem';
import { SmartContracts } from '../../api/smartContract/SmartContract';

/** Renders a table containing all of the Stuff documents. Use <SmartContractItem> to render each row. */
class SignSmartContract extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Grid container centered>
        <br/>
        <Header as="h2" textAlign="center">View and Deploy Smart Contract</Header>
        {this.props.smartContracts.map((smartContract) => <SignSmartContractItem key={smartContract._id} smartContract={smartContract} />)}
      </Grid>
    );
  }
}

// Require an array of SmartContract documents in the props.
SignSmartContract.propTypes = {
  smartContracts: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to SmartContract documents.
  const subscription = Meteor.subscribe(SmartContracts.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the SmartContract documents
  const smartContracts = SmartContracts.collection.find({}).fetch();
  return {
    smartContracts,
    ready,
  };
})(SignSmartContract);
