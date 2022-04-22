import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Profiles } from '../../api/profile/Profile';
import Profile from '../components/Profile';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ViewProfile extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">View Profile </Header>
        {this.props.profiles.map((profile, index) => <Profile
          key={index}
          profile={profile}
        />)}
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ViewProfile.propTypes = {
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const profiles = Profiles.collection.find({}).fetch();
  return {
    profiles,
    ready,
  };
})(ViewProfile);
