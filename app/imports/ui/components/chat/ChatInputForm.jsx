import React from 'react';
import { Button, Form, Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default function ChatInputForm({ submitFn }) {
  return (
    <Form onSubmit={submitFn}>
      <Form.Group unstackable>
        <Form.Input placeholder='Text message' width={14}/>
        <Popup content='Send message' trigger={
          <Button type='submit' icon='send' color='blue' inverted circular width={2} onClick={() => console.log('submit')} />
        } />
        <Popup content='Add image or file content' trigger={
          <Button icon='plus' color='blue' inverted circular width={2} onClick={() => console.log('upload')}/>
        } />
      </Form.Group>
    </Form>
  );
}

ChatInputForm.propTypes = {
  submitFn: PropTypes.func,
};
