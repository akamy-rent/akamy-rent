import React from 'react';
import { Grid, Loader, Header, Segment, Tab, Table } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Stuffs } from '../../api/stuff/Stuff';

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

const bridge = new SimpleSchema2Bridge(Stuffs.schema);

/** Renders the Page for editing a single document. */
class EditSmartContract extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { name, email, phoneNumber, role, numberOfTenets, stance, billingAddress, bankAccountNumber, bankAccountRoutingNumber, signature, _id } = data;
    Stuffs.collection.update(_id, { $set: { name, email, phoneNumber, role, numberOfTenets, stance, billingAddress, bankAccountNumber, bankAccountRoutingNumber, signature } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Information updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Edit Smart Contract (Draft)</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
            <Segment>
              <Tab panes={panes} />
              <ErrorsField/>
              <HiddenField name='owner' />
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditSmartContract.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Stuffs.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Stuffs.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditSmartContract);
