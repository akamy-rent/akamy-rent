import React from 'react';
import { Grid, Header, Loader, Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, NumField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { SmartContracts } from '../../../api/smartContract/SmartContract';
import { Groups } from '../../../api/group/Group';
import InfoPopup from '../../components/common/InfoPopup';
import { Profiles } from '../../../api/profile/Profile';
import { getFullnameFromProfile } from '../../components/profile/ProfileUtils';

// Create a schema to specify the structure of the data to appear in the form.
const contractSchema = new SimpleSchema({
  name: String,
  homeownerName: String,
  homeownerEmail: String,
  homeownerPhoneNumber: String,
  tenantName: String,
  tenantEmail: String,
  tenantPhoneNumber: String,
  unitAddress: String,
  monthlyRent: Number,
  termsAndConditions: {
    type: String,
    defaultValue: '',
  },
});

// setState: changes state of the page.
// if don't know participants, render getParticipates
// if know participants, render fillParticipants data
const bridge = new SimpleSchema2Bridge(contractSchema);

/** Renders the Page for adding a document. */
class AddSmartContract extends React.Component {

  createMessengerGroup(name, members) {
    try {
      const insertResult = Groups.collection.insert({ name, members, messages: [] });
      return insertResult;
    } catch (e) {
      throw new Error(`Error occured during creation of group wit params: ${name}, ${members}`);
    }
  }

  // On submit, insert the data.
  submit(data, formRef) {
    const { name, homeownerName, homeownerEmail, homeownerPhoneNumber, homeownerSignature, tenantName, tenantEmail, tenantPhoneNumber, tenantSignature, unitAddress, monthlyRent, termsAndConditions } = data;
    const owner = Meteor.user().username;
    const status = 'Pending';
    const groupid = this.createMessengerGroup(name, [homeownerEmail, tenantEmail]);
    SmartContracts.collection.insert({ name, homeownerName, homeownerEmail, homeownerPhoneNumber, homeownerSignature, tenantName, tenantEmail, tenantPhoneNumber, tenantSignature, unitAddress, monthlyRent, termsAndConditions, status, owner, groupid },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Information saved successfully', 'success');
          formRef.reset();
        }
      });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    let fRef = null;
    return (
      <Grid container centered id={'add-smart-contract-page'}>
        <Grid.Column>
          <br/>
          <Header as="h2" textAlign="center">Create Smart Contract</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField id={'contract-name'} name='name' label='Name of Contract'/>
              <TextField id={'unit-address'} name='unitAddress'/>
              <NumField id={'monthly-rent'} name='monthlyRent' decimal={true}/>
              <Segment>
                <Header as='h4'>
                  Homeowner Details
                  <InfoPopup color='blue' text='Your profile information is automatically used for the homeowner details as only homeowners can create smart contracts.' />
                </Header>
                <TextField
                  id={'homeowner-name'}
                  disabled
                  value={getFullnameFromProfile(this.props.userProfile)}
                  name='homeownerName'
                />
                <TextField
                  id={'homeowner-email'}
                  disabled
                  value={this.props.userProfile.owner}
                  name='homeownerEmail'
                />
                <TextField
                  id={'homeowner-phone'}
                  disabled
                  value={this.props.userProfile.phoneNumber}
                  name='homeownerPhoneNumber'
                />
              </Segment>
              <Segment>
                <Header as='h4'>
                  Tenant Details
                  <InfoPopup color='blue' text='Add the tenant info below. Note that only one tenant is supported at this time.' />
                </Header>
                <TextField id={'tenant-name'} name='tenantName'/>
                <TextField id={'tenant-email'} name='tenantEmail'/>
                <TextField id={'tenant-phone'} name='tenantPhoneNumber'/>
              </Segment>
              <LongTextField id={'t-and-c'} name='termsAndConditions'/>
              <SubmitField id={'save'} value='Save'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

AddSmartContract.propTypes = {
  user: PropTypes.object,
  profiles: PropTypes.array,
  userProfile: PropTypes.object,
  ready: PropTypes.bool,
};

export default withTracker(() => {
  const user = Meteor.user();
  const subscription = Meteor.subscribe(Profiles.publicProfilePublicationName);
  const ready = subscription.ready() && user !== undefined;
  const profiles = Profiles.collection.find({}).fetch();
  const userProfile = profiles.find(profile => profile.owner === user?.username);
  return {
    user,
    profiles,
    userProfile,
    ready,
  };
})(AddSmartContract);
