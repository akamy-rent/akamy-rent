import PropTypes from 'prop-types';

/** Reusable chat prop type definitions */
export const MessageTextType = PropTypes.shape({
  type: PropTypes.oneOf(['text']),
  text: PropTypes.string,
});

/* Images and Files share the same shape but are different in type */
export const MessageFileType = PropTypes.shape({
  type: PropTypes.oneOf(['file', 'image']),
  url: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
});

export const ChatMessageType = PropTypes.shape({
  createdat: PropTypes.instanceOf(Date),
  createdby: PropTypes.string,
  content: PropTypes.oneOfType([
    MessageTextType,
    MessageFileType,
  ]).isRequired,
});

export const ChatGroupType = PropTypes.shape({
  name: PropTypes.string,
  members: PropTypes.arrayOf(String).isRequired,
  messages: PropTypes.arrayOf(ChatMessageType).isRequired,
});
