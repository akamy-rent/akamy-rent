import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List member table. See pages/Listmember.jsx. */
class SmartContractItem extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.member.name}</Table.Cell>
        <Table.Cell>{this.props.member.role}</Table.Cell>
        <Table.Cell>{this.props.member.stance}</Table.Cell>
        <Table.Cell>
          <Link to={`/edit/${this.props.member._id}`}>Edit</Link>
        </Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
SmartContractItem.propTypes = {
  member: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    stance: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(SmartContractItem);
