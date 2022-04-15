import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Grid, Header, Image, Loader, Menu } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';

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
        <Grid centered>
          <Grid.Row>
            <Grid columns={2} verticalAlign='middle'>
              <Grid.Column>
                <Image size='medium' src="/images/meteor-logo.png" rounded/>
                  Username
              </Grid.Column>
              <Grid.Column>
                <Menu text>
                  <Menu.Item as={NavLink} exact to="/editProfile/:_id" link color='red'>
                      Edit Profile
                  </Menu.Item>
                </Menu>
              </Grid.Column>
            </Grid>

          </Grid.Row>
          <Grid.Row>
              First and Last Names
          </Grid.Row>
          <Grid.Row>
              Wallet Address
          </Grid.Row>

        </Grid>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ViewProfile.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Stuffs.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const stuffs = Stuffs.collection.find({}).fetch();
  return {
    stuffs,
    ready,
  };
})(ViewProfile);
