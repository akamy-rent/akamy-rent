import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List smartContract table. See pages/ListsmartContract.jsx. */
class SmartContractItemAdmin extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.smartContract.name}</Table.Cell>
        <Table.Cell>{this.props.smartContract.role}</Table.Cell>
        <Table.Cell>{this.props.smartContract.stance}</Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
SmartContractItemAdmin.propTypes = {
  smartContract: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    stance: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(SmartContractItemAdmin);
