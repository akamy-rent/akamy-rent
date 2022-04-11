import React from 'react';
import { Feed, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { ChatGroupType } from './ChatTypes';

export default function ChatFeedItem({ setGroupFn, group }) {
  return (
    <Feed.Event>
      <Feed.Label><Icon name='user'/></Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <Feed.User onClick={() => setGroupFn(group.groupname)}>{group.groupname}</Feed.User>
          <Feed.Date>{new Date(group.createdat).toLocaleString()}</Feed.Date>
        </Feed.Summary>
      </Feed.Content>
    </Feed.Event>
  );
}

ChatFeedItem.propTypes = {
  setGroupFn: PropTypes.func,
  group: ChatGroupType,
};
