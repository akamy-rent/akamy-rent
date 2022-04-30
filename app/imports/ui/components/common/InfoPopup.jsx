import React from 'react';
import { Button, Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default function InfoPopup({ color, text }) {
  return (
    <Popup
      inverted
      content={text}
      trigger={<Button style={{ marginLeft: '3px' }} icon='info' color={color} circular size='massive' />}
    />
  );
}

InfoPopup.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
};
