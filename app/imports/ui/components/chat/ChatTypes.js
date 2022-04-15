import PropTypes from 'prop-types';

/** Reusable chat prop type definitions */
export const ChatGroupType = PropTypes.shape({
  groupname: PropTypes.string,
  createdat: PropTypes.string,
});

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
  groupname: PropTypes.string,
  createdat: PropTypes.string,
  createdby: PropTypes.string,
  content: PropTypes.oneOfType([
    MessageTextType,
    MessageFileType,
  ]),
});
