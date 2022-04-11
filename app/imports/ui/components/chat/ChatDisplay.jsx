import React from 'react';
import { Container, Header, Icon, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ChatMessage from './ChatMessage';
import ChatInputForm from './ChatInputForm';

export default function ChatDisplay({ messages, groupName, inputSubmitFn }) {
  return (
    <>
      <Header as='h2'>Chat Display</Header>
      <hr/>
      <Container style={{ height: '100%' }}>
        { groupName === undefined
          ? <Segment placeholder>
            <Header icon>
              <Icon name='chat' />
              Select a chat from the feed on the left.
            </Header>
          </Segment>
          : <>
            <Container style={{ height: '80%', overflowY: 'auto' }}>
              {messages.map((message, index) => <ChatMessage key={index} message={message}/>)}
            </Container>
            <hr/>
            <Container style={{ height: '20%' }}>
              <ChatInputForm submitFn={inputSubmitFn}/>
            </Container>
          </>
        }
      </Container>
    </>
  );
}

ChatDisplay.propTypes = {
  messages: PropTypes.array.isRequired,
  groupName: PropTypes.string,
  // function to submit chat input
  inputSubmitFn: PropTypes.func,
};
