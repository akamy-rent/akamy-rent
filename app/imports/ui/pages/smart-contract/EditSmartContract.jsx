import React from 'react';
import { Container, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, LongTextField, NumField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { SmartContracts } from '../../../api/smartContract/SmartContract';
import { isHomeowner } from '../../components/smart-contract/SmartContractUtils';
import InfoPopup from '../../components/common/InfoPopup';

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

const bridge = new SimpleSchema2Bridge(contractSchema);

/** Renders the Page for editing a single document. */
class EditSmartContract extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { homeownerName, homeownerEmail, homeownerPhoneNumber, tenantName, tenantEmail, tenantPhoneNumber, unitAddress, monthlyRent, status, termsAndConditions, _id } = data;
    const username = this.props.user.username;

    if (isHomeowner(data, username)) {
      SmartContracts.collection.update(_id, { $set: { homeownerName, homeownerEmail, homeownerPhoneNumber, tenantName, tenantEmail, tenantPhoneNumber, unitAddress,
        monthlyRent, status, termsAndConditions } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Information updated successfully', 'success')));
    } else {
      swal('Error', 'You are not permitted to edit this smart contract', 'error');
    }
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
        <Container id={'edit-smart-contract-page'} container centered>
          <br/>
          <Header as="h2" textAlign="center">Edit Smart Contract</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
            <Segment>
              <TextField id={'contract-name'} disabled name='name' help='asdf' label='Name of Contract'/>
              <TextField id={'unit-address'} name='unitAddress'/>
              <NumField id={'monthly-rent'} name='monthlyRent' decimal={true}/>
              <Segment>
                <Header as='h4'>
                  Homeowner Details
                  <InfoPopup color='blue' text='Your profile information is automatically used for the homeowner details as only homeowners can create smart contracts.' />
                </Header>
                <TextField id={'homeowner-name'} disabled name='homeownerName'/>
                <TextField id={'homeowner-email'} disabled name='homeownerEmail'/>
                <TextField id={'homeowner-phone'} disabled name='homeownerPhoneNumber'/>
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
        </Container>
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
  const _id = match.params._id;
  // Get access to SmartContract documents.
  const subscription = Meteor.subscribe(SmartContracts.userPublicationName);

  const user = Meteor.user();
  // Determine if the subscription is ready
  const ready = subscription.ready() && user !== undefined;

  // Get the document
  const doc = SmartContracts.collection.findOne(_id);
  return {
    doc,
    user,
    ready,
  };
})(EditSmartContract);