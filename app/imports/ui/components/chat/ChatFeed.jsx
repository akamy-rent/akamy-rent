import React from 'react';
import { Feed, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ChatFeedItem from './ChatFeedItem';

export default function ChatFeed({ setGroupFn, groups }) {
  return (
    <>
      <Header as='h2'>Conversations</Header>
      <hr />
      <Feed>
        { groups.map((group, index) => <ChatFeedItem key={index} group={group} setGroupFn={setGroupFn} />)}
      </Feed>
    </>
  );
}

ChatFeed.propTypes = {
  setGroupFn: PropTypes.func,
  groups: PropTypes.array.isRequired,
};
