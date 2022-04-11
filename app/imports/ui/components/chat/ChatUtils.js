/** Temporary test data * */
export const GROUP_1 = 'SC123';
export const GROUP_2 = 'SC124';

export const groups = [{
  groupname: GROUP_1,
  createdat: new Date((new Date()).setMonth(1)).toISOString(),
}, {
  groupname: GROUP_2,
  createdat: new Date((new Date()).setMonth(3)).toISOString(),
}];

export const messages = [{
  groupname: GROUP_1,
  createdat: new Date((new Date()).setMonth(1)).toISOString(),
  createdby: 'john@foo.com',
  type: 'text',
  content: {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam egestas auctor tristique. Aliquam erat volutpat. Aliquam scelerisque elementum rhoncus.',
  } }, {
  groupname: GROUP_1,
  createdat: new Date((new Date()).setMonth(2)).toISOString(),
  createdby: 'admin@foo.com',
  content: {
    text: 'Nam suscipit et purus vitae sodales. Sed ipsum magna, laoreet eget pretium vel, aliquam non massa. Proin convallis.',
  } }, {
  groupname: GROUP_1,
  createdat: new Date((new Date()).setMonth(3)).toISOString(),
  createdby: 'admin@foo.com',
  type: 'text',
  content: {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam egestas auctor tristique. Aliquam erat volutpat. Aliquam scelerisque elementum rhoncus.',
  } }, {
  groupname: GROUP_1,
  createdat: new Date((new Date()).setMonth(4)).toISOString(),
  createdby: 'john@foo.com',
  content: {
    text: 'Nam suscipit et purus vitae sodales. Sed ipsum magna, laoreet eget pretium vel, aliquam non massa. Proin convallis.',
  } }, {
  groupname: GROUP_2,
  createdat: new Date((new Date()).setMonth(3)).toISOString(),
  createdby: 'john@foo.com',
  content: {
    text: 'Nam suscipit et purus vitae sodales. Sed ipsum magna, laoreet eget pretium vel, aliquam non massa. Proin convallis in leo non placerat.',
  } },
];

export function getContent80(message) {
  switch (message.type) {
  case 'text':
    return message.text.slice(80)[0];
  default:
    return '';
  }
}
