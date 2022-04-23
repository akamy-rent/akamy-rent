import React, { useCallback, useState } from 'react';
import { Button, Form, Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default function ChatInputForm({ submitFn }) {
  const [textInput, setTextInput] = useState('');

  const handleFieldChange = useCallback((event) => {
    event.preventDefault();
    const text = event.target.value;
    setTextInput(text);
  }, [setTextInput]);

  const handleFormSubmission = (event) => {
    event.preventDefault();
    submitFn(textInput);
    setTextInput('');
  };

  return (
    <>
      <Form onSubmit={handleFormSubmission}>
        <Form.Group unstackable>
          <Form.Input value={textInput} onChange={handleFieldChange} placeholder='Text message' width={14}/>
          <Popup content='Send message' trigger={
            <Button type='submit' icon='send' color='blue' inverted circular width={2} />
          } />
          <Popup content='Add image or file content' trigger={
            <Button icon='plus' color='blue' inverted circular width={2} />
          } />
        </Form.Group>
      </Form>
    </>
  );
}

/*
<AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => handleFormSubmission(data, fRef)}>
      </AutoForm>
 */
ChatInputForm.propTypes = {
  submitFn: PropTypes.func,
};
