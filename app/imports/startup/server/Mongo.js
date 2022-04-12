import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { dashboard } from '../../api/dashboard/dashboard';
/* eslint-disable no-console */

// Initialize the database with a default data document.
/*
function addDashboard(data) {
  dashboard.collection.insert(data);
}


if (dashboard.collection.find().count() === 0) {
  if (Meteor.settings.defaultDashboard) {
    console.log('Creating default data.');
    Meteor.settings.defaultDashboard.map(data => addDashboard(data));
  }
}
*/
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}