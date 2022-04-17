import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField, NumField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Members } from '../../api/member/Member';

// Create a schema to specify the structure of the data to appear in the form.
const contractSchema = new SimpleSchema({
  name: String,
  email: String,
  phoneNumber: String,
  role: {
    type: String,
    allowedValues: ['Tenet', 'Homeowner'],
    defaultValue: 'Tenet',
  },
  unitAddress: String,
  monthlyRent: Number,
  stance: {
    type: String,
    allowedValues: ['I do not agree to the terms and conditions', 'I agree to the terms and conditions', ''],
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
    const { name, email, phoneNumber, role, unitAddress, numberOfTenets, monthlyRent, stance } = data;
    const owner = Meteor.user().username;
    Members.collection.insert({ name, email, phoneNumber, role, unitAddress, numberOfTenets, monthlyRent, stance, owner },
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
          <Header as="h2" textAlign="center">Create Smart Contract (Draft)</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='unitAddress'/>
              <NumField name='monthlyRent' decimal={true}/>
              <Segment>
                <SelectField name='role' value='Homeowner'/>
                <TextField name='name'/>
                <TextField name='email'/>
                <TextField name='phoneNumber'/>
              </Segment>
              <Segment>
                <SelectField name='role'/>
                <TextField name='name'/>
                <TextField name='email'/>
                <TextField name='phoneNumber'/>
              </Segment>
              <br/>
              <p>Terms and conditions for smart contract with __ number of tenets. Cost, frequency of payment, parties
                involved.</p>
              <SelectField name='stance'/>
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
