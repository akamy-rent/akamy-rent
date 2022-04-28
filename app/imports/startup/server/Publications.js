import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { SmartContracts } from '../../api/smartContract/SmartContract.js';
import { Groups } from '../../api/group/Group.js';
import { dashboard } from '../../api/dashboard/dashboard';
import { Profiles } from '../../api/profile/Profile';

// User profiles
Meteor.publish(Profiles.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Profiles.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Profiles.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Profiles.collection.find();
  }
  return this.ready();
});

// This publication provides access to "public" info from other users.
Meteor.publish(Profiles.publicProfilePublicationName, function () {
  if (this.userId) {
    return Profiles.collection.find({}, { firstName: 1, lastName: 1, phoneNumber: 1, imageUrl: 1, email: '$owner' });
  }
  return this.ready();
});

// Smart contracts
Meteor.publish(SmartContracts.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return SmartContracts.collection.find({
      $or: [
        { owner: username },
        { tenantEmail: username },
      ],
    });
  }
  return this.ready();
});

Meteor.publish(SmartContracts.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return SmartContracts.collection.find();
  }
  return this.ready();
});

// Groups for messenger
Meteor.publish(Groups.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Groups.collection.find({ members: username });
  }
  return this.ready();
});

Meteor.publish(Groups.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Groups.collection.find();
  }
  return this.ready();
});

// Dashboard
Meteor.publish(dashboard.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return dashboard.collection.find({ owner: username });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(dashboard.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return dashboard.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
