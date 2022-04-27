import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Header, Icon, Segment } from 'semantic-ui-react';
import { css } from '@emotion/css';
import ScrollToBottom from 'react-scroll-to-bottom';
import PropTypes from 'prop-types';
import ChatMessage from './ChatMessage';
import ChatInputForm from './ChatInputForm';
import { Groups } from '../../../api/group/Group';

// sample code for ScrollToBottom: from https://www.npmjs.com/package/react-scroll-to-bottom
const MessageScrollClass = css({
  height: '100%',
});

export default function ChatDisplay({ groupid, inputSubmitFn }) {
  const group = useTracker(() => Groups.collection.findOne({ _id: groupid }), [groupid]);

  return (
    <>
      { group !== undefined
        ? <Header as='h2'>
          { group.name }
        </Header>
        : <Header as='h2'> Chat Display </Header>
      }
      <hr/>
      <Container style={{ height: '100%' }}>
        { group === undefined
          ? <Segment placeholder>
            <Header icon>
              <Icon name='chat' />
              Select a chat from the feed on the left.
            </Header>
          </Segment>
          : <>
            <Container style={{ height: '80%', overflowY: 'auto' }}>
              <ScrollToBottom className={MessageScrollClass}>
                {group.messages.map((message, index) => <ChatMessage key={index} message={message}/>)}
              </ScrollToBottom>
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
  groupid: PropTypes.string,
  // function to submit chat input
  inputSubmitFn: PropTypes.func,
};
