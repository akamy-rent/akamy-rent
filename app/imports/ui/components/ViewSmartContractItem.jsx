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
            {this.props.smartContract.homeownerName}
            <Header>Homeowner Email</Header>
            {this.props.smartContract.homeownerEmail}
            <Header>Homeowner Phone Number</Header>
            {this.props.smartContract.homeownerPhoneNumber}
          </Grid.Column>
          <Grid.Column>
            <Header>Tenet Name</Header>
            {this.props.smartContract.tenetName}
            <Header>Homeowner Email</Header>
            {this.props.smartContract.tenetEmail}
            <Header>Homeowner Phone Number</Header>
            {this.props.smartContract.tenetPhoneNumber}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header>House Address</Header>
            {this.props.smartContract.unitAddress}
            <Header>Monthly Payment</Header>
           $ {this.props.smartContract.monthlyRent}
            <Header>Terms and Conditions</Header>
            <p>{this.props.smartContract.termsAndConditions}</p>
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
    homeownerEmail: PropTypes.string,
    homeownerPhoneNumber: PropTypes.string,
    tenetName: PropTypes.string,
    tenetEmail: PropTypes.string,
    tenetPhoneNumber: PropTypes.string,
    tenetStance: PropTypes.string,
    monthlyRent: PropTypes.number,
    termsAndConditions: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ViewSmartContractItem);
