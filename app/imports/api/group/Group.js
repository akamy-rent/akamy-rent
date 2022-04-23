import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

// eslint-disable-next-line no-unused-vars
export const MessageTextSchema = new SimpleSchema({
  type: {
    type: String,
    allowedValues: ['text'],
  },
  text: String,
});

// eslint-disable-next-line no-unused-vars
export const MessageFileSchema = new SimpleSchema({
  type: {
    type: String,
    allowedValues: ['file', 'image'],
  },
  description: String,
  title: String,
  url: String,
});

const MessageSchema = new SimpleSchema({
  createdat: Date,
  createdby: String,
  content: {
    // correct approach would be oneOf, but SimplSchema has a bug
    // that hasn't been fixed in 5 years!!!
    // https://github.com/longshotlabs/simpl-schema/issues/112
    // type: SimpleSchema.oneOf(MessageTextSchema, MessageFileSchema)
    type: Object,
    blackbox: true,
  },
});

class GroupsCollection {
  constructor() {
    this.name = 'GroupCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      name: String,
      members: [String],
      messages: [MessageSchema],
    }, { tracker: Tracker });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Groups = new GroupsCollection();
