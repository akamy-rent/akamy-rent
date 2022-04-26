import React from 'react';
import { Header, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List smartContract table. See pages/ListsmartContract.jsx. */
class SmartContractItem extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.smartContract.unitAddress}</Table.Cell>
        <Table.Cell>{this.props.smartContract.homeownerName}</Table.Cell>
        <Table.Cell>{this.props.smartContract.tenetName}</Table.Cell>
        <Table.Cell>{this.props.smartContract.status}</Table.Cell>
        <Table.Cell>
          <Link to={`/view/${this.props.smartContract._id}`}><Header inverted as="h5">View</Header></Link>
        </Table.Cell>
        <Table.Cell>
          <Link to={`/edit/${this.props.smartContract._id}`}><Header inverted as="h5">Edit</Header></Link>
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
    tenetName: PropTypes.string,
    tenetStance: PropTypes.string,
    status: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(SmartContractItem);
