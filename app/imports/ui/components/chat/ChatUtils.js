/**
 * Utility functions for the messenger components.
 */

export function getContent80(message) {
  switch (message.type) {
  case 'text':
    return message.text.length > 80 ? `${message.text.slice(0, 80)}...` : message.text;
  default:
    return '';
  }
}

export function getLastMessage(messages) {
  const count = messages.length;
  if (count === 0) {
    return '';
  }
  return messages[count - 1];
}

export function getLastContent80(messages) {
  return getContent80(getLastMessage(messages)?.content ?? '');
}
