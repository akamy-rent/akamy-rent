import React from 'react';
import {Grid, Header} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Dashboard extends React.Component {

  render() {
    return (
        <Grid.Row columns={3}>
          <Grid.Column>
            <Header as='h2' inverted>{this.props.dashboard.activeContracts}</Header>
            <Header as='h2' inverted>Active Contracts</Header>
          </Grid.Column>

          <Grid.Column>
            <Header as='h2' inverted>{this.props.dashboard.totalIncome}</Header>
            <Header as='h2' inverted>Total Income</Header>
          </Grid.Column>

          <Grid.Column>
            <Header as='h2' inverted>{this.props.dashboard.totalExpenses}</Header>
            <Header as='h2' inverted>Total Expenses</Header>
          </Grid.Column>
        </Grid.Row>
    );
  }
}

// Require a document to be passed to this component.
Dashboard.propTypes = {
  dashboard: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Dashboard);
