import { Meteor } from 'meteor/meteor';
import '/imports/startup/server/Accounts';
import '/imports/startup/server/Publications';
import '/imports/startup/server/Mongo';

if (Meteor.isServer) {
  Meteor.methods({
    getGanacheURL: function () {
      const ganacheURL = process.env.GANACHE_URL;
      return ganacheURL;
    },
  });
}
