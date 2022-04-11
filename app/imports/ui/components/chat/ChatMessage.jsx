import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { ChatMessageType } from './ChatTypes';

/**
function getMessageContent(content) {
  switch (content.type) {
    case 'text':
      return (
        <p>content.text</p>
      );
    default:
      return (
        <p></p>
      );
  }
}
 */

export default function ChatMessage({ message }) {
  const ownMessage = message.createdby === 'john@foo.com';
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
            { new Date(message.createdat).toLocaleString() }
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Segment inverted color={backgroundColor}>
        { message.content.text }
      </Segment>
    </Segment>
  );
}

ChatMessage.propTypes = {
  message: ChatMessageType,
};
