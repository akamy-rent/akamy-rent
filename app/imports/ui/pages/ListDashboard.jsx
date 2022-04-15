import React from 'react';
import { Button, Container, Grid, Header, Icon, Image, Loader, Table } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import {dashboard} from '../../api/dashboard/dashboard';

/** A simple static component to render some text for the landing page. */
class ListDashboard extends React.Component {
  render() {
    return (
        <Container>
          <Grid verticalAlign='middle' textAlign='center' container>
            <Grid.Row columns={3}>
              <Grid.Column>
                <br></br>
                <Header as='h1' >3</Header>
                <Header as='h2' >Active Contracts</Header>
              </Grid.Column>

              <Grid.Column>
                <br></br>
                <Header as='h1' >$ 400</Header>
                <Header as='h2' >Total Income</Header>
              </Grid.Column>

              <Grid.Column>
                <br></br>
                <Header as='h1' > $ 300</Header>
                <Header as='h2' >Total Expenses</Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <Header as='h1'>Smart Contracts</Header>
          <br></br>
          <br></br>
          <Table color='blue' key='blue' inverted>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={3}>Address</Table.HeaderCell>
                <Table.HeaderCell width={3}>Role in Contract</Table.HeaderCell>
                <Table.HeaderCell width={2}>Created</Table.HeaderCell>
                <Table.HeaderCell width={2}>Rate</Table.HeaderCell>
                <Table.HeaderCell width={2}>Active</Table.HeaderCell>
                <Table.HeaderCell width={2}>View</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>Address</Table.Cell>
                <Table.Cell>Homeowner</Table.Cell>
                <Table.Cell>Created</Table.Cell>
                <Table.Cell>Rate</Table.Cell>
                <Table.Cell>Active</Table.Cell>
                <Table.Cell>View</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Address</Table.Cell>
                <Table.Cell>Tenet</Table.Cell>
                <Table.Cell>Created</Table.Cell>
                <Table.Cell>Rate</Table.Cell>
                <Table.Cell>Pending</Table.Cell>
                <Table.Cell>View</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Address</Table.Cell>
                <Table.Cell>Homeowner</Table.Cell>
                <Table.Cell>Created</Table.Cell>
                <Table.Cell>Rate</Table.Cell>
                <Table.Cell>Pending</Table.Cell>
                <Table.Cell>View</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <Grid verticalAlign='middle' textAlign='center' container>
            <Grid.Row columns={3}>
              <Grid.Column>
                <br></br>
                <Button size="massive" color="black"><Icon name='file outline'></Icon>Create Contracts</Button>
              </Grid.Column>

              <Grid.Column>
                <br></br>
                <Button size="massive" color="black"><Icon name='envelope open outline'></Icon> Messenger</Button>
              </Grid.Column>

              <Grid.Column>
                <br></br>
                <Button size="massive" color="black"><Icon name='user circle'></Icon>My Profile</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

        </Container>


    );
  }
}

ListDashboard.propTypes = {
  dashboard: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(dashboard.userPublicationName);

  return {
    dashboard: dashboard.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListDashboard);