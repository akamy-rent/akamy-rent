import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, LongTextField, NumField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { SmartContracts } from '../../api/smartContract/SmartContract';

const contractSchema = new SimpleSchema({
  homeownerName: String,
  homeownerEmail: String,
  homeownerPhoneNumber: String,
  tenetName: String,
  tenetEmail: String,
  tenetPhoneNumber: String,
  unitAddress: String,
  monthlyRent: Number,
  termsAndConditions: {
    type: String,
    defaultValue: '',
  },
});

const bridge = new SimpleSchema2Bridge(contractSchema);

/** Renders the Page for editing a single document. */
class EditSmartContract extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { homeownerName, homeownerEmail, homeownerPhoneNumber, tenetName, tenetEmail, tenetPhoneNumber, unitAddress, monthlyRent, status, _id } = data;
    const username = this.props.user.username;

    if (username === homeownerEmail) {
      SmartContracts.collection.update(_id, { $set: { homeownerName, homeownerEmail, homeownerPhoneNumber, tenetName, tenetEmail, tenetPhoneNumber, unitAddress,
        monthlyRent, status } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Information updated successfully', 'success')));
    } else {
      swal('Error', 'Only homeowner can edit these fields', 'error');
    }
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
          <br/>
          <Header as="h2" textAlign="center">Edit Smart Contract (Draft)</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
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

// Require the presence of a SmartContract document in the props object. Uniforms adds 'model' to the props, which we use.
EditSmartContract.propTypes = {
  doc: PropTypes.object,
  user: PropTypes.object,
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
  const user = Meteor.user();
  // Get the document
  const doc = SmartContracts.collection.findOne(documentId);
  return {
    doc,
    user,
    ready,
  };
})(EditSmartContract);
