import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Members } from '../../api/member/Member.js';
import { dashboard } from '../../api/dashboard/dashboard';
// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.

Meteor.publish(Members.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Members.collection.find({ owner: username });
  }
  return this.ready();
});

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
