import React from 'react';
import { Feed, Header, Icon, Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ChatFeedItem from './ChatFeedItem';

export default function ChatFeed({ setGroupFn, groups, groupid }) {
  return (
    <>
      <Header as='h2'>Conversations<Popup content='You can chat with the homeowner and Tenant here.' trigger={<Icon size='small' name='question circle outline' />} /></Header>
      <hr />
      <Feed>
        { groups.map((group, index) => <ChatFeedItem key={index} groupid={groupid} group={group} setGroupFn={setGroupFn} />)}
      </Feed>
    </>
  );
}

ChatFeed.propTypes = {
  setGroupFn: PropTypes.func,
  groups: PropTypes.array.isRequired,
  groupid: PropTypes.string,
};
