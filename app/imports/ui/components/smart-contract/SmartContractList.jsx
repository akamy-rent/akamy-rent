import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import SmartContractItem from './SmartContractItem';

/** Renders a table containing all of the Stuff documents. Use <SmartContractItem> to render each row. */
class SmartContractList extends React.Component {
  // Render the page once subscriptions have been received.
  render() {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Unit Address</Table.HeaderCell>
            <Table.HeaderCell>Homeowner</Table.HeaderCell>
            <Table.HeaderCell>Tenant</Table.HeaderCell>
            <Table.HeaderCell>Tenant Stance</Table.HeaderCell>
            <Table.HeaderCell>Tenant Signature</Table.HeaderCell>
            <Table.HeaderCell>Homeowner Signature</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.smartContracts.map((smartContract) => <SmartContractItem key={smartContract._id} smartContract={smartContract} />)}
        </Table.Body>
      </Table>
    );
  }
}

// Require an array of SmartContract documents in the props.
SmartContractList.propTypes = {
  smartContracts: PropTypes.array.isRequired,
};

export default SmartContractList;
