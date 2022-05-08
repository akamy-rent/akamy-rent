import React from 'react';
import { Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { ChatGroupType } from './ChatTypes';
import { getLastContent80, getLastMessage } from './ChatUtils';
import { displayRelativeTime } from '../common/CommonUtils';

export default function ChatFeedItem({ setGroupFn, group, groupid }) {
  const baseStyle = { padding: '2px' };
  const activeStyle = { ...baseStyle, background: 'rgba(0,0,0,.1)' };
  const active = group._id === groupid;
  return (
    <Feed.Event style={active ? activeStyle : baseStyle}>
      <Feed.Content style={{ cursor: 'pointer' }} onClick={() => setGroupFn(group)}>
        <Feed.Summary >
          <Feed.User>{group.name}</Feed.User>
          <Feed.Date>{ group.messages.length > 0
            ? displayRelativeTime(getLastMessage(group.messages).createdat)
            : ''
          }</Feed.Date>
        </Feed.Summary>
        <Feed.Extra style={{ paddingLeft: '6pt' }} text>
          { getLastContent80(group.messages)}
        </Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  );
}

ChatFeedItem.propTypes = {
  setGroupFn: PropTypes.func,
  group: ChatGroupType,
  groupid: PropTypes.string,
};
