import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, NumField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { SmartContracts } from '../../api/smartContract/SmartContract';

// Create a schema to specify the structure of the data to appear in the form.
const contractSchema = new SimpleSchema({
  homeownerName: String,
  homeownerEmail: String,
  homeownerPhoneNumber: String,
  tenetName: String,
  tenetEmail: String,
  tenetPhoneNumber: String,
  tenetStance: {
    type: String,
    allowedValues: ['I do not agree to the terms and conditions', 'I agree to the terms and conditions', ''],
    defaultValue: '',
  },
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

  // On submit, insert the data.
  submit(data, formRef) {
    const { homeownerName, homeownerEmail, homeownerPhoneNumber, homeownerSignature, tenetName, tenetEmail, tenetPhoneNumber, tenetStance, tenetSignature, unitAddress, monthlyRent, termsAndConditions } = data;
    const owner = Meteor.user().username;
    const status = 'Pending';
    SmartContracts.collection.insert({ homeownerName, homeownerEmail, homeownerPhoneNumber, homeownerSignature, tenetName, tenetEmail, tenetPhoneNumber, tenetStance, tenetSignature, unitAddress, monthlyRent, termsAndConditions, status, owner },
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
      <Grid container centered>
        <Grid.Column>
          <br/>
          <Header as="h2" textAlign="center">Create Smart Contract (Draft)</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='unitAddress'/>
              <NumField name='monthlyRent' decimal={true}/>
              <Segment>
                <TextField name='homeownerName'/>
                <TextField name='homeownerEmail'/>
                <TextField name='homeownerPhoneNumber'/>
              </Segment>
              <Segment>
                <TextField name='tenetName'/>
                <TextField name='tenetEmail'/>
                <TextField name='tenetPhoneNumber'/>
              </Segment>
              <LongTextField name='termsAndConditions'/>
              <SubmitField value='Save'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddSmartContract;
