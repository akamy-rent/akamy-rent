import { Meteor } from 'meteor/meteor';
import { SmartContracts } from '../../api/smartContract/SmartContract.js';
import { Profiles } from '../../api/profile/Profile';
import { Groups } from '../../api/group/Group.js';
/* eslint-disable no-console */

function addProfile(data) {
  console.log(`  Adding: ${data.firstName} (${data.owner})`);
  Profiles.collection.insert(data);
}

// Initialize the ProfilesCollection if empty.
if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultProfiles.map(data => addProfile(data));
  }
}

function addGroup(group) {
  Groups.collection.insert(group);
}

if (Groups.collection.find().count() === 0) {
  if (Meteor.settings.defaultGroups) {
    Meteor.settings.defaultGroups.map(group => {
      const messages = group.messages.map(message => ({
        ...message,
        createdat: new Date(),
      }));
      addGroup({
        ...group,
        messages,
      });
      return null;
    });
  }
}

// Initialize the database with a default data document.
function addContract(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  SmartContracts.collection.insert(data);
}

// Initialize the SmartContractsCollection if empty.
if (SmartContracts.collection.find().count() === 0) {
  if (Meteor.settings.defaultSmartContract) {
    console.log('Creating default smart contracts.');
    Meteor.settings.defaultSmartContract.map(data => {
      const groups = Groups.collection.find({}).fetch();
      const group = groups.find(g => g.name === data.name);
      console.log('Group for smart contract', group);
      if (group !== undefined) {
        addContract({ ...data, groupid: group._id });
      }
      return group;
    });
  }
}
