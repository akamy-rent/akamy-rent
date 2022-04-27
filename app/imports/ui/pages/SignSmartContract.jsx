import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Loader, Grid, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import SimpleSchema from 'simpl-schema';
import { SmartContracts } from '../../api/smartContract/SmartContract';
import SignSmartContractItem from '../components/SignSmartContractItem';

const contractSchemaSignature = new SimpleSchema({
  signature: String,
});

const contractSchemaTenantStance = new SimpleSchema({
  tenantStance: {
    type: String,
    allowedValues: ['Unsigned', 'Agreement'],
    defaultValue: 'Unsigned',
  },
});

const bridgeSignature = new SimpleSchema2Bridge(contractSchemaSignature);
const bridgeTenantStance = new SimpleSchema2Bridge(contractSchemaTenantStance);

const isTenant = (contract, username) => contract.tenantEmail === username;
const isHomeowner = (contract, username) => contract.homeownerEmail === username;

const missingSignature = (contract, username) => (isTenant(contract, username) && contract.tenantSignature === '') || (
  isHomeowner(contract, username) && contract.homeownerSignature === '');

/** Renders a table containing all of the Stuff documents. Use <SmartContractItem> to render each row. */
class SignSmartContract extends React.Component {
  // On successful submit, insert the data.

  submit(data) {
    const { tenantEmail, tenantStance, _id } = data;
    const username = this.props.user.username;

    if (username === tenantEmail) {
      SmartContracts.collection.update(_id, { $set: { tenantStance } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Information updated successfully', 'success')));
    } else {
      swal('Error', 'Only tenant can fill out this field', 'error');
    }
  }

  submitSignature(data) {
    const { signature, _id, homeownerEmail, homeownerName, tenantEmail, tenantName, tenantStance } = data;
    const username = this.props.user.username;

    if (username === homeownerEmail && signature === homeownerName) {
      SmartContracts.collection.update(_id, { $set: { homeownerSignature: signature } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Smart contract successfully signed by homeowner', 'success')));
    } else if (username === tenantEmail && signature === tenantName) {
      if (tenantStance === 'Agreement') {
        SmartContracts.collection.update(_id, { $set: { tenantSignature: signature } }, (error) => (error ?
          swal('Error', error.message, 'error') :
          swal('Success', 'Smart contract successfully signed by tenant', 'success')));
      } else {
        swal('Error', 'Tenet stance must be agreement before signing', 'error');
      }
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
        { console.log(this.props.ready) }
        <br/>
        { console.log(this.props.smartContract) }
        <Header as="h2" textAlign="center">View and Deploy Smart Contract</Header>
        <SignSmartContractItem key={this.props.smartContract._id} smartContract={this.props.smartContract} />
        <Segment>
          <Segment>
            <AutoForm schema={bridgeTenantStance} onSubmit={data => this.submit(data)} model={this.props.smartContract}>
              <SelectField name='tenantStance'/>
              <SubmitField value='Save'/>
              <ErrorsField/>
            </AutoForm>
          </Segment>
          {missingSignature(this.props.smartContract, this.props.user.username) &&
              <Segment>
                <AutoForm schema={bridgeSignature} onSubmit={data => this.submitSignature(data)}
                  model={this.props.smartContract}>
                  <TextField name='signature'/>
                  <SubmitField value='Save'/>
                  <ErrorsField/>
                </AutoForm>
              </Segment>
          }</Segment>
      </Grid>
    );
  }
}

// Require an array of SmartContract documents in the props.
SignSmartContract.propTypes = {
  smartContract: PropTypes.object,
  user: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the contract id from request params
  const { _id } = match.params;
  // Get access to SmartContract documents.
  const subscription = Meteor.subscribe(SmartContracts.userPublicationName);
  // Determine if the subscription is ready
  const subscriptionReady = subscription.ready();
  // Get the SmartContract documents
  const smartContract = SmartContracts.collection.findOne(_id);
  const user = Meteor.user();
  const ready = subscriptionReady && user !== undefined;
  return {
    smartContract,
    user,
    ready,
  };
})(SignSmartContract);
