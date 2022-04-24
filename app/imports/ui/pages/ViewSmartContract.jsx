import React from 'react';
import { Grid, Loader, Header } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { SmartContracts } from '../../api/smartContract/SmartContract';
import ViewSmartContractItem from '../components/ViewSmartContractItem';

/** Renders the Page for editing a single document. */
class ViewSmartContract extends React.Component {
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Grid container centered>
        <Grid.Column>
          <br/>
          <Header as="h2" textAlign="center">View Smart Contract</Header>
          <br/>
          <br/>
          {this.props.smartContracts.map((smartContract) => <ViewSmartContractItem key={smartContract._id} smartContract={smartContract} />)}
          <br/>
          <br/>
          <br/>
          <br/>
        </Grid.Column>
      </Grid>

    );
  }
}

// Require the presence of a SmartContract document in the props object. Uniforms adds 'model' to the props, which we use.
ViewSmartContract.propTypes = {
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
})(ViewSmartContract);
