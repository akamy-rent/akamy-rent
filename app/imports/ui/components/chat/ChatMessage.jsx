import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Segment } from 'semantic-ui-react';
import { ChatMessageType } from './ChatTypes';

function getMessageContent(content) {
  switch (content.type) {
  case 'text':
    return content.text;
  default:
    return '';
  }
}

export default function ChatMessage({ message }) {
  const currentUser = Meteor.user();
  const ownMessage = message.createdby === currentUser.username;
  const backgroundColor = ownMessage ? 'blue' : 'grey';
  const floatedPosition = ownMessage ? 'right' : 'left';

  return (
    <Segment basic floated={floatedPosition} style={{ width: '50%' } }>
      <Grid>
        <Grid.Row>
          <Grid.Column width={8} textAlign='left'>
            { message.createdby }
          </Grid.Column>
          <Grid.Column width={8} textAlign='right'>
            { message.createdat.toLocaleString() }
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Segment inverted color={backgroundColor}>
        { getMessageContent(message.content) }
      </Segment>
    </Segment>
  );
}

ChatMessage.propTypes = {
  message: ChatMessageType,
};
