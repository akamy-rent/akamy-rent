import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, NumField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { SmartContracts } from '../../../api/smartContract/SmartContract';
import { Groups } from '../../../api/group/Group';

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

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
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
                <TextField id={'homeowner-name'} name='homeownerName'/>
                <TextField id={'homeowner-email'} name='homeownerEmail'/>
                <TextField id={'homeowner-phone'} name='homeownerPhoneNumber'/>
              </Segment>
              <Segment>
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

export default AddSmartContract;
