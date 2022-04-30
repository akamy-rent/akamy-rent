import React from 'react';
import { Button, Header, Icon, Modal, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { displayRelativeTimeFromString } from '../common/CommonUtils';

function TransactionLogItem({ log }) {
  return (
    <Table.Row>
      { console.log(log.date) }
      <Table.Cell>
        { displayRelativeTimeFromString(log.date) }
      </Table.Cell>
      <Table.Cell>
        { log.action }
      </Table.Cell>
    </Table.Row>
  );
}

TransactionLogItem.propTypes = {
  log: PropTypes.object.isRequired,
};

export default function TransactionModal({ smartContract, open, onClose }) {
  // ToDo: Remove this default data once transactions are persisted in the DB.
  const logs = smartContract.logs?.length ? smartContract.logs : [
    { date: '2022-04-28T12:22:09+0000', action: 'FAKE!!!!: Rent paid contract at X paid Y wei to Homeowner' },
    { date: '2022-04-20T12:28:09+0000', action: 'FAKE!!!!: Tenant address: X paid Y wei to contract.' },
  ];

  return (
    <Modal
      closeIcon
      open={open}
      trigger={<Button>Show Modal</Button>}
      onClose={onClose}
    >
      <Header icon='archive' content='Transaction Log' />
      <Modal.Content>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { logs.map((log, index) => <TransactionLogItem key={index} log={log} />)}
          </Table.Body>
        </Table>
      </Modal.Content>
      <Modal.Actions>
        <Button color='grey' onClick={onClose}>
          <Icon name='close' /> Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

TransactionModal.propTypes = {
  smartContract: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
