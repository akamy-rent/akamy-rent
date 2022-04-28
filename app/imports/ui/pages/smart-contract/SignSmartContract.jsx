import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Loader, Grid, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import SimpleSchema from 'simpl-schema';
import SignSmartContractItem from '../../components/smart-contract/SignSmartContractItem';
import { SmartContracts } from '../../../api/smartContract/SmartContract';
import { Profiles } from '../../../api/profile/Profile';
import { bothSigned, createTenant, createHomeowner } from '../../../api/smartContract/smartContractDeployment';

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
const contractPending = (contract) => contract.status === 'Pending';

const missingSignature = (contract, username) => (isTenant(contract, username) && contract.tenantSignature === '') || (
  isHomeowner(contract, username) && contract.homeownerSignature === '');

/** Renders a table containing all of the Stuff documents. Use <SmartContractItem> to render each row. */
class SignSmartContract extends React.Component {
  // On successful submit, insert the data.
  // check if the contract has been signed by both parties

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
    const profiles = this.props.profile;
    // homeowner check and sign
    if (username === homeownerEmail && signature === homeownerName) {
      SmartContracts.collection.update(_id, { $set: { homeownerSignature: signature } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Smart contract successfully signed by homeowner', 'success')));
    }

    // if I'm not a homeowner I should be the tenant
    if (username === tenantEmail && signature === tenantName) {
      if (tenantStance === 'Agreement') {
        SmartContracts.collection.update(_id, { $set: { tenantSignature: signature } }, (error) => (error ?
          swal('Error', error.message, 'error') :
          swal('Success', 'Smart contract successfully signed by tenant', 'success')));
      } else {
        swal('Error', 'Tenet stance must be agreement before signing', 'error');
      }
    }
    // update the contract and check if both people are signed, this should never run unless both are signed, or if I'm not a tenant nor homeowner
    const newlySignedContract = SmartContracts.collection.findOne(_id);
    if (bothSigned(newlySignedContract)) {
      SmartContracts.collection.update(_id, { $set: { status: 'Active' } }, function (error) {
        if (error) {
          swal('Error', error.message, 'Contract was not updated');
        } else {
          swal('Success', 'Smart contract successfully signed by homeowner', 'success');
          // create the objects to store data
          const hOwner = createHomeowner(profiles, homeownerEmail);
          const tNant = createTenant(profiles, tenantEmail);
          console.log(hOwner, tNant);
        }
      });
    // something got messed up
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
        <SignSmartContractItem key={this.props.smartContract._id} smartContract={this.props.smartContract} />
        <Segment>
          {contractPending(this.props.smartContract) && isTenant(this.props.smartContract, this.props.user.username) &&
            <Segment>
              <AutoForm schema={bridgeTenantStance} onSubmit={data => this.submit(data)} model={this.props.smartContract}>
                <SelectField name='tenantStance'/>
                <SubmitField value='Save'/>
                <ErrorsField/>
              </AutoForm>
            </Segment>}
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
  profile: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the contract id from request params
  const { _id } = match.params;
  // Get access to SmartContract documents.
  const subscription = Meteor.subscribe(SmartContracts.userPublicationName);
  const pSubscription = Meteor.subscribe(Profiles.publicProfilePublicationName);
  // Determine if the subscription is ready
  const subscriptionReady = subscription.ready() && pSubscription.ready();
  // Get the SmartContract documents
  const smartContract = SmartContracts.collection.findOne(_id);
  const user = Meteor.user();
  const profile = Profiles.collection.find({}).fetch();
  const ready = subscriptionReady && user !== undefined;
  return {
    smartContract,
    user,
    profile,
    ready,
  };
})(SignSmartContract);
