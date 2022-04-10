import React from 'react';
import { Grid, Segment, Header, Tab, Table } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField, NumField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Stuffs } from '../../api/stuff/Stuff';

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
  NumberOfTenets: Number,
  stance: {
    type: String,
    allowedValues: ['I do not agree to the terms and conditions', 'I agree to the terms and conditions'],
    defaultValue: 'I do not agree to the terms and conditions',
  },
  billingAddress: String,
  bankAccountNumber: String,
  bankAccountRoutingNumber: String,
  signature: String,
});

const panes = [
  { menuItem: 'Parties Involved', render: () => <Tab.Pane>
    <TextField name='name'/>
    <TextField name='email'/>
    <TextField name='phoneNumber'/>
    <SelectField name='role'/>
    <SubmitField value='Save'/>
  </Tab.Pane> },
  { menuItem: 'Smart Contract Type', render: () => <Tab.Pane>
    <NumField name='NumberOfTenets' decimal={false}/>
    <SubmitField value='Save'/>
  </Tab.Pane> },
  { menuItem: 'Terms & Conditions', render: () => <Tab.Pane>
    <p>Terms and conditions for smart contract with __ number of tenets. Cost, frequency of payment, parties involved.</p>
    <SelectField name='stance'/>
    <SubmitField value='Save'/>
  </Tab.Pane> },
  { menuItem: 'Payment Information', render: () => <Tab.Pane>
    <TextField name='billingAddress'/>
    <TextField name='bankAccountNumber'/>
    <TextField name='bankAccountRoutingNumber'/>
    <SubmitField value='Save'/>
  </Tab.Pane> },
  { menuItem: 'Party Review Status', render: () => <Tab.Pane>
    <Table definition>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Role</Table.HeaderCell>
          <Table.HeaderCell>Terms & Conditions Approval Status</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>John Doe</Table.Cell>
          <Table.Cell>Tenet</Table.Cell>
          <Table.Cell>Approved</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Mary Jane</Table.Cell>
          <Table.Cell>Tenet</Table.Cell>
          <Table.Cell>Rejected</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Naruto Uzumaki</Table.Cell>
          <Table.Cell>Homeowner</Table.Cell>
          <Table.Cell>Incomplete</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </Tab.Pane> },
  { menuItem: 'Sign', render: () => <Tab.Pane>
    <p>I hereby accept the terms and conditions outlined in this smart contract.</p>
    <TextField name='signature'/>
    <SubmitField value='Create smart contract!'/>
  </Tab.Pane> },
];

const bridge = new SimpleSchema2Bridge(contractSchema);

/** Renders the Page for adding a document. */
class AddSmartContract extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { name, email, phoneNumber, role } = data;
    const owner = Meteor.user().username;
    Stuffs.collection.insert({ name, email, phoneNumber, role, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Person added successfully', 'success');
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
              <Tab panes={panes} />
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddSmartContract;
