import React from 'react';
import { Button, Container, Grid, Header, Icon } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { SmartContracts } from '../../api/smartContract/SmartContract';
import SmartContractList from '../components/smart-contract/SmartContractList';

const paddingStyle = { paddingTop: '5%' };

/** A simple static component to render some text for the landing page. */
class ListDashboard extends React.Component {
  render() {
    return (
      <Container id="list-dashboard-page">
        <Grid style={paddingStyle} verticalAlign='middle' textAlign='center' container>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Header as='h1' >0</Header>
              <Header as='h2' >Active Contracts</Header>
            </Grid.Column>

            <Grid.Column>
              <Header as='h1' >$ 1000</Header>
              <Header as='h2' >Total Income</Header>
            </Grid.Column>

            <Grid.Column>
              <Header as='h1' > $ 300</Header>
              <Header as='h2' >Total Expenses</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Header style={paddingStyle} as='h1'>Smart Contracts</Header>
        <SmartContractList smartContracts={this.props.smartContracts} />

        <Grid style={paddingStyle} verticalAlign='middle' textAlign='center' container>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Button as={NavLink} to="/add" size="massive" color="black"><Icon name='file outline'></Icon>Create Contracts</Button>
            </Grid.Column>

            <Grid.Column>
              <Button as={NavLink} to="/chat" size="massive" color="black"><Icon name='envelope open outline'></Icon> Messenger</Button>
            </Grid.Column>

            <Grid.Column>
              <Button as={NavLink} to="/viewProfile" size="massive" color="black"><Icon name='user circle'></Icon>My Profile</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

ListDashboard.propTypes = {
  smartContracts: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to SmartContract documents.
  const subscription = Meteor.subscribe(SmartContracts.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the SmartContract documents
  const smartContracts = SmartContracts.collection.find({}).fetch();
  return {
    smartContracts,
    ready,
  };
})(ListDashboard);
