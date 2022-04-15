import React from 'react';
import { Feed, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ChatFeedItem from './ChatFeedItem';

export default function ChatFeed({ setGroupFn, groups }) {
  return (
    <>
      <Header as='h2'>Feed</Header>
      <hr />
      <Feed>
        { groups.map((feedItem, index) => <ChatFeedItem key={index} group={feedItem} setGroupFn={setGroupFn} />)}
      </Feed>
    </>
  );
}

ChatFeed.propTypes = {
  setGroupFn: PropTypes.func,
  groups: PropTypes.array.isRequired,
};
