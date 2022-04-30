import React from 'react';
import _ from 'lodash';
import { Button, Container, Grid, Header, Icon, Loader } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { SmartContracts } from '../../api/smartContract/SmartContract';
import SmartContractList from '../components/smart-contract/SmartContractList';

const paddingStyle = { paddingTop: '5%' };
/** A simple static component to render some text for the landing page. */
class Dashboard extends React.Component {
  totalActive(data) {
    const activeC = _.filter(data, function (num) {
      return num.status === 'Active';
    });
    return activeC.length;
  }

  monthlyIncome(data) {
    const username = this.props.user.username;
    const IncomeC = _.filter(data, function (num) {
      return num.owner === username && num.status === 'Active';
    });
    const income = _.map(IncomeC, function (num) { return num.monthlyRent; });
    const monthlyIncome = _.reduce(income, function (memo, num) { return memo + num; }, 0);
    return monthlyIncome;
  }

  monthlyPayment(data) {
    const username = this.props.user.username;
    const PaymentC = _.filter(data, function (num) {
      return num.owner !== username && num.status === 'Active';
    });
    const payment = _.map(PaymentC, function (num) { return num.monthlyRent; });
    const monthlyPayment = _.reduce(payment, function (memo, num) { return memo + num; }, 0);
    return monthlyPayment;

  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <Container id="list-dashboard-page">
        <Grid style={paddingStyle} verticalAlign='middle' textAlign='center' container>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Header as='h1' >{this.totalActive(this.props.smartContracts)}</Header>
              <Header as='h2' >Active Contracts</Header>
            </Grid.Column>

            <Grid.Column>
              <Header as='h1' >$ {this.monthlyIncome(this.props.smartContracts)}</Header>
              <Header as='h2' >Monthly Income</Header>
            </Grid.Column>

            <Grid.Column>
              <Header as='h1' > $ {this.monthlyPayment(this.props.smartContracts)}</Header>
              <Header as='h2' >Monthly Payment</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Header style={paddingStyle} as='h2'>Smart Contracts</Header>
        <SmartContractList smartContracts={this.props.smartContracts} />
        <br/>
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

Dashboard.propTypes = {
  smartContracts: PropTypes.array.isRequired,
  user: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to SmartContract documents.
  const subscription = Meteor.subscribe(SmartContracts.userPublicationName);
  // Determine if the subscription is ready
  const subscriptionReady = subscription.ready();
  // Get the SmartContract documents
  const smartContracts = SmartContracts.collection.find({}).fetch();
  // Get the User
  const user = Meteor.user();
  const ready = subscriptionReady && user !== undefined;
  return {
    smartContracts,
    ready,
    user,
  };
})(Dashboard);
