import React from 'react';
import { Grid, Loader, Header } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Profiles } from '../../../api/profile/Profile';

const bridge = new SimpleSchema2Bridge(Profiles.schema);
/** Renders the Page for editing a single document. */
class EditProfile extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const memberId = this.props.profiles[0]._id;
    const { firstName, lastName, imageURL, phoneNumber, walletAddress } = data;
    Profiles.collection.update(memberId, { $set: { firstName, lastName, imageURL, phoneNumber, walletAddress } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Profile updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    const gridStyle = { marginTop: '10px', marginBottom: '10px' };
    return (
      <Grid id="editProfilePage" container centered style={gridStyle}>
        <Grid.Row>
          <Header as='h1' style={{ marginBottom: '5%', marginTop: '2%' }} > Edit Profile </Header>
        </Grid.Row>
        <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={
          this.props.profiles[0]} >
          <Grid columns={2}>
            <Grid.Column>
              <TextField id="fname" name='firstName' />
            </Grid.Column>
            <Grid.Column>
              <TextField id="lname" name='lastName' />
            </Grid.Column>
          </Grid>
          <TextField id="phone" name='phoneNumber' />
          <TextField id="wallet" name='walletAddress' />
          <TextField id="key" name='privateKey' />
          <TextField id="image" name='imageURL' />
          <SubmitField id="submitButton" value='Submit'/>
        </AutoForm>
      </Grid>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditProfile.propTypes = {
  profiles: PropTypes.array,
  ready: PropTypes.bool.isRequired,
  l: PropTypes.number,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document

  const profiles = Profiles.collection.find({}).fetch();
  const l = profiles.length;

  if (l === 0 && ready) {
    const getUserName = Meteor.user().username;
    const defaultProfilesData = {
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '111-222-3333',
      walletAddress: 'ethereum address must be min 20 characters',
      imageURL: '/images/meteor-logo.png',
      privateKey: 'Do not share this key with anyone',
      publicAddress: 'public address',
      owner: getUserName,
    };
    Profiles.collection.insert(defaultProfilesData);
  }

  // const
  return {
    l,
    profiles,
    ready,
  };

})(EditProfile);
