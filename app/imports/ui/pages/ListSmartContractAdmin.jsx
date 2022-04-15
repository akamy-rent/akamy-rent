import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Members } from '../../api/member/Member';
import MemberItemAdmin from '../components/MemberItemAdmin';

/** Renders a table containing all of the Stuff documents. Use <MemberItem> to render each row. */
class ListSmartContractAdmin extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">List Smart Contracts (Homeowner)</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
              <Table.HeaderCell>Stance</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.members.map((member) => <MemberItemAdmin key={member._id} member={member} />)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

// Require an array of Member documents in the props.
ListSmartContractAdmin.propTypes = {
  members: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Member documents.
  const subscription = Meteor.subscribe(Members.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Member documents
  const members = Members.collection.find({}).fetch();
  return {
    members,
    ready,
  };
})(ListSmartContractAdmin);
