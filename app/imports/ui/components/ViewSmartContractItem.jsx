import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List smartContract table. See pages/ListsmartContract.jsx. */
class ViewSmartContractItem extends React.Component {
  render() {
    return (
      <Grid divided='vertically'>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Header>Homeowner Name</Header>
            <Header as="h4">{this.props.smartContract.homeownerName}</Header>
            <Header>Homeowner Email</Header>
            <Header as="h4">{this.props.smartContract.homeownerEmail}</Header>
            <Header>Homeowner Phone Number</Header>
            <Header as="h4">{this.props.smartContract.homeownerPhoneNumber}</Header>

          </Grid.Column>
          <Grid.Column>
            <Header>Tenet Name</Header>
            <Header as="h4">{this.props.smartContract.tenetName}</Header>
            <Header>Homeowner Email</Header>
            <Header as="h4">{this.props.smartContract.tenetEmail}</Header>
            <Header>Homeowner Phone Number</Header>
            <Header as="h4">{this.props.smartContract.tenetPhoneNumber}</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header>House Address</Header>
            <Header as="h4">{this.props.smartContract.unitAddress}</Header>
            <Header>Monthly Payment</Header>
            <Header as="h4">$ {this.props.smartContract.monthlyRent}</Header>
            <Header>Terms and Conditions</Header>
            <Header as="h4">{this.props.smartContract.termsAndConditions}</Header>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }
}

// Require a document to be passed to this component.
ViewSmartContractItem.propTypes = {
  smartContract: PropTypes.shape({
    homeownerEmail: PropTypes.string,
    homeownerPhoneNumber: PropTypes.string,
    unitAddress: PropTypes.string,
    homeownerName: PropTypes.string,
    tenetName: PropTypes.string,
    tenetPhoneNumber: PropTypes.string,
    tenetStance: PropTypes.string,
    tenetEmail: PropTypes.string,
    monthlyRent: PropTypes.string,
    termsAndConditions: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ViewSmartContractItem);
