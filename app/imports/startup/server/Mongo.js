import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/Profile';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addProfile(data) {
  console.log(`  Adding: ${data.firstName} (${data.owner})`);
  Profiles.collection.insert(data);
}

// Initialize the MembersCollection if empty.
if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addProfile(data));
  }
}
