import React, { useCallback, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default function ChatInputForm({ submitFn }) {
  const [textInput, setTextInput] = useState('');

  const handleFieldChange = useCallback((event) => {
    event.preventDefault();
    const text = event.target.value;
    setTextInput(text);
  }, [setTextInput]);

  const handleFormSubmission = useCallback((event) => {
    event.preventDefault();
    submitFn(textInput);
    setTextInput('');
  }, [textInput]);

  return (
    <>
      <Form onSubmit={handleFormSubmission}>
        <Form.Group unstackable>
          <Form.Input id='messenger-text-input' value={textInput} onChange={handleFieldChange} placeholder='Text message' width={14}/>
          <Button id='messenger-submit-text' type='submit' icon='send' color='blue' inverted circular width={2} />
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
