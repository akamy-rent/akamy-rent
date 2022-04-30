import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Button, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { isHomeowner } from './SmartContractUtils';

/** Renders a single row in the List smartContract table. See pages/ListsmartContract.jsx. */
class SmartContractItem extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.smartContract.unitAddress}</Table.Cell>
        <Table.Cell>{this.props.smartContract.homeownerName}</Table.Cell>
        <Table.Cell>{this.props.smartContract.tenantName}</Table.Cell>
        <Table.Cell>{this.props.smartContract.tenantStance}</Table.Cell>
        <Table.Cell>{this.props.smartContract.tenantSignature}</Table.Cell>
        <Table.Cell>{this.props.smartContract.homeownerSignature}</Table.Cell>
        <Table.Cell>{this.props.smartContract.status}</Table.Cell>
        <Table.Cell>
          {isHomeowner(this.props.smartContract, this.props.user?.username) &&
                        <Link to={`/edit/${this.props.smartContract._id}`}>
                          <Button compact color='blue'>Edit</Button>
                        </Link>
          }
          <Link to={`/sign/${this.props.smartContract._id}`}>
            <Button compact color='orange'>Sign</Button>
          </Link>
        </Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
SmartContractItem.propTypes = {
  smartContract: PropTypes.shape({
    unitAddress: PropTypes.string,
    homeownerName: PropTypes.string,
    homeownerSignature: PropTypes.string,
    tenantName: PropTypes.string,
    tenantStance: PropTypes.string,
    tenantSignature: PropTypes.string,
    status: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  user: PropTypes.object,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withTracker(() => {
  const user = Meteor.user();
  const ready = user !== undefined;
  return {
    user,
    ready,
  };
})(withRouter(SmartContractItem));
