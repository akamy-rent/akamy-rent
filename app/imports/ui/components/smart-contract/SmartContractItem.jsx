import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Button, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { isHomeowner } from './SmartContractUtils';
import React, { useCallback, useState } from 'react';
import TransactionModal from './TransactionModal';

// ToDo: After merge of issue-81, update this
// to only say "sign" if the signature is missing,
// else it would just say "view"
function signButtonText(contract) {
  if (contract.status === 'Pending') {
    return 'Sign';
  }
  return 'View';
}
/** Renders a single row in the List smartContract table. See pages/ListsmartContract.jsx. */
function SmartContractItem({ smartContract }) {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [open]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [open]);

  return (
    <Table.Row>
      <Table.Cell>{smartContract.unitAddress}</Table.Cell>
      <Table.Cell>{smartContract.homeownerName}</Table.Cell>
      <Table.Cell>{smartContract.tenantName}</Table.Cell>
      <Table.Cell>{smartContract.tenantStance}</Table.Cell>
      <Table.Cell>{smartContract.tenantSignature}</Table.Cell>
      <Table.Cell>{smartContract.homeownerSignature}</Table.Cell>
      <Table.Cell>{smartContract.status}</Table.Cell>
      <Table.Cell>
        {isHomeowner(this.props.smartContract, this.props.user?.username) &&
                        <Link to={`/edit/${this.props.smartContract._id}`}>
                          <Button compact color='blue'>Edit</Button>
                        </Link>
        }
        <Link to={`/sign/${smartContract._id}`}>
          <Button compact color='black'>{signButtonText(smartContract)}</Button>
        </Link>
        <Button compact color='black' onClick={handleOpen}>Transactions</Button>
        {open && <TransactionModal smartContract={smartContract} onClose={handleClose} open={open} />}
      </Table.Cell>
    </Table.Row>
  );
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
