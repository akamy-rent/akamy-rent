import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List smartContract table. See pages/ListsmartContract.jsx. */
class SignSmartContractItem extends React.Component {
  render() {
    return (
      <Container textAlign={'left'}>
        <Segment>
          <p>Smart contract status: {this.props.smartContract.status}</p>
          <Segment>
            <Header as="h3" textAlign="left">Unit Info</Header>
            <p>Address: {this.props.smartContract.unitAddress}</p>
            <p>Monthly rent: {this.props.smartContract.monthlyRent}</p>
          </Segment>
          <Segment>
            <Header as="h3" textAlign="left">Homeowner Info</Header>
            <p>Name: {this.props.smartContract.homeownerName}</p>
            <p>Email: {this.props.smartContract.homeownerEmail}</p>
            <p>Phone number: {this.props.smartContract.homeownerPhoneNumber}</p>
          </Segment>
          <Segment>
            <Header as="h3" textAlign="left">tenant Info</Header>
            <p>Name: {this.props.smartContract.tenantName}</p>
            <p>Email: {this.props.smartContract.tenantEmail}</p>
            <p>Phone number: {this.props.smartContract.tenantPhoneNumber}</p>
          </Segment>
          <Segment>
            <Header as="h3" textAlign="left">Terms and Conditions</Header>
            <p>{this.props.smartContract.termsAndConditions}</p>
          </Segment>
        </Segment>
        <br/>
      </Container>
    );
  }
}

// Require a document to be passed to this component.
SignSmartContractItem.propTypes = {
  smartContract: PropTypes.shape({
    status: PropTypes.string,
    homeownerName: PropTypes.string,
    homeownerEmail: PropTypes.string,
    homeownerPhoneNumber: PropTypes.string,
    homeownerSignature: PropTypes.string,
    tenantName: PropTypes.string,
    tenantEmail: PropTypes.string,
    tenantPhoneNumber: PropTypes.string,
    tenantSignature: PropTypes.string,
    unitAddress: PropTypes.string,
    monthlyRent: PropTypes.number,
    termsAndConditions: PropTypes.string,
    tenantStance: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(SignSmartContractItem);
