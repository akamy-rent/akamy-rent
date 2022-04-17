import { Meteor } from 'meteor/meteor';
import { Members } from '../../api/member/Member.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addMember(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Members.collection.insert(data);
}

// Initialize the MembersCollection if empty.
if (Members.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addMember(data));
  }
}
