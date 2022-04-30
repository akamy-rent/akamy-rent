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
import { isHomeowner, isTenant } from '../../components/smart-contract/SmartContractUtils';
import { SmartContracts } from '../../../api/smartContract/SmartContract';
import { Profiles } from '../../../api/profile/Profile';
import { bothSigned, createTenant, createHomeowner } from '../../../api/smartContract/smartContractDeployment';
import { createAndCompileContract } from '../../../api/solc/connect2Compiler';
import { loadProvider, deployContract, payRentScheduler } from '../../../api/ethers/ethersFunctions';

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

const contractPending = (contract) => contract.status === 'Pending';

const missingSignature = (contract, username) => (isTenant(contract, username) && contract.tenantSignature === '') || (
  isHomeowner(contract, username) && contract.homeownerSignature === '');

/** Renders a table containing all of the Stuff documents. Use <SmartContractItem> to render each row. */
class SignSmartContract extends React.Component {

  signatureCheck(profiles, username, data) {
    // update the contract and check if both people are signed, this should never run unless both are signed, or if I'm not a tenant nor homeowner
    const { _id, homeownerEmail, tenantEmail, signature } = data;
    let contract = SmartContracts.collection.findOne(_id);
    // check if both signatures are signed
    if (bothSigned(contract)) {
      const { provider, genacheExists } = loadProvider();
      if (genacheExists) {
        // both have signed, let's try to deploy it
        SmartContracts.collection.update(_id, { $set: { homeowner: createHomeowner(profiles, homeownerEmail), tenant: createTenant(profiles, tenantEmail) } });
        contract = SmartContracts.collection.findOne(_id);
        createAndCompileContract(contract).then(response => {
          const { abi, bytecode } = response.data;
          if (response.status === 200) {
            SmartContracts.collection.update(_id, { $set: { status: 'Active', abi: abi, bytecode: bytecode } }, function (error) {
              if (error) {
                swal('Error', error.message, 'Contract was not updated');
              } else {
                contract = SmartContracts.collection.findOne(_id);
                const signerType = homeownerEmail === username ? 'homeowner' : 'tenant';
                swal('Success', `Smart contract successfully signed by ${signerType}.\nContract creation and deployment initializing`, 'success');
                deployContract(contract, provider).then(value => {
                  if (value) {
                    SmartContracts.collection.update(_id, { $set: { address: value, rent: contract.monthlyRent } }, (e) => {
                      if (e) {
                        console.log(`Deployment error: ${e}`);
                      } else {
                        contract = SmartContracts.collection.findOne(_id);
                        // ToDo: Get this to actually work on the back end
                        payRentScheduler(contract, provider);
                      }
                    });
                  } else {
                    SmartContracts.collection.update(_id, { $set: { address: null } });
                    swal('Error', 'Network Error', 'Contract was not deployed, Contract address is null');
                  }
                });
              }
            });
          } else {
            swal('Error', 'Network Error', 'Contract was not compiled');
          }
        }, error => swal('Error', error, 'Contract was not compiled'));
      } else { // blockchain is not available
        const signerType = homeownerEmail === username ? 'homeowner' : 'tenant';
        SmartContracts.collection.update(_id, { $set: { status: 'Active' } }, (error) => (error ?
          swal('Error', error.message, 'error') :
          swal('Success', `Smart contract successfully signed by ${signerType}.\nContract Activated but there's no blockchain`, 'success')));
      }
    } else { // both aren't signed
      const signatureObject = homeownerEmail === username ? { homeownerSignature: signature } : { tenantSignature: signature };
      SmartContracts.collection.update(_id, { $set: signatureObject }, function (error) {
        if (error) {
          swal('Error', error.message, 'Contract was not updated');
        } else {
          // this person is whoever
          const signerType = homeownerEmail === username ? 'homeowner' : 'tenant';
          swal('Success', `Smart contract successfully signed by ${signerType}`, 'success');
        }
      });
    }
  }

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

  // On successful submit, insert the data.
  submitSignature(data, SmartContractObj) {
    const { signature, _id, homeownerEmail, homeownerName, tenantEmail, tenantName, tenantStance } = data;
    const username = this.props.user.username;
    const profiles = this.props.profiles;
    // homeowner check and sign
    if (username === homeownerEmail && signature === homeownerName) {
      SmartContracts.collection.update(_id, { $set: { homeownerSignature: signature } },
        function (error) {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            SmartContractObj.signatureCheck(profiles, username, data);
          }
        });
    } else if (username === tenantEmail && signature === tenantName) {
      if (tenantStance === 'Agreement') {
        SmartContracts.collection.update(_id, { $set: { tenantSignature: signature } },
          function (error) {
            if (error) {
              swal('Error', error.message, 'error');
            } else {
              // check if both signatures are now signed, will create the contract if both are now signed
              SmartContractObj.signatureCheck(profiles, username, data);
            }
          });
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
              <AutoForm schema={bridgeSignature} onSubmit={data => this.submitSignature(data, this)}
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
  profiles: PropTypes.array,
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
  const profiles = Profiles.collection.find({}).fetch();
  const ready = subscriptionReady && user !== undefined;
  return {
    smartContract,
    user,
    profiles,
    ready,
  };
})(SignSmartContract);
