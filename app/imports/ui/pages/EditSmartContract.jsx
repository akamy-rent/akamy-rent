import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { SmartContracts } from '../../api/smartContract/SmartContract';

const bridge = new SimpleSchema2Bridge(SmartContracts.schema);

/** Renders the Page for editing a single document. */
class EditSmartContract extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { name, email, phoneNumber, role, unitAddress, numberOfTenets, monthlyRent, stance, _id } = data;
    SmartContracts.collection.update(_id, { $set: { name, email, phoneNumber, role, unitAddress, numberOfTenets, monthlyRent, stance } }, (error) => (error ?
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

// Require the presence of a SmartContract document in the props object. Uniforms adds 'model' to the props, which we use.
EditSmartContract.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to SmartContract documents.
  const subscription = Meteor.subscribe(SmartContracts.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = SmartContracts.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditSmartContract);
