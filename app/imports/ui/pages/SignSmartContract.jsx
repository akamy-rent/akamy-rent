import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Loader, Grid, Segment, Form } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import {AutoForm, ErrorsField, SubmitField, TextField} from 'uniforms-semantic';
import SimpleSchema from 'simpl-schema';
import { SmartContracts } from '../../api/smartContract/SmartContract';
import SignSmartContractItem from '../components/SignSmartContractItem';
import SmartContractItem from "../components/SmartContractItem";

const contractSchema = new SimpleSchema({
  signature: String,
});

const bridge = new SimpleSchema2Bridge(contractSchema);

/** Renders a table containing all of the Stuff documents. Use <SmartContractItem> to render each row. */
class SignSmartContract extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { signature, _id } = data;
    const username = Meteor.user().username;
    const homeownerEmail = SmartContracts.collection.homeownerEmail;
    const tenetEmail = SmartContracts.collection.tenetEmail;
    console.log(username);
    console.log(`homeownerName: ${homeownerEmail}`);
    console.log(`tenetName: ${tenetEmail}`);

    if (username === homeownerEmail) {
      const homeownerSignature = signature;
      SmartContracts.collection.update(_id, { $set: { homeownerSignature } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', `Information updated successfully homeowner ${homeownerSignature}`, 'success')));
    }
    if (username === tenetEmail) {
      const tenetSignature = signature;
      SmartContracts.collection.update(_id, { $set: { tenetSignature } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', `Information updated successfully tenet ${tenetSignature}`, 'success')));
    } else {
      swal('Error', 'Signature must be full name', 'error');
    }
  }

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
        <Segment>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.smartContracts}>
            <TextField name='signature'/>
            <SubmitField value='Save'/>
            <ErrorsField/>
          </AutoForm>
        </Segment>
      </Grid>
    );
  }
}

// Require an array of SmartContract documents in the props.
SignSmartContract.propTypes = {
  smartContracts: PropTypes.array.isRequired,
  model: PropTypes.object,
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
