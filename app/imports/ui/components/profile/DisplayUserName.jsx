import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Profiles } from '../../../api/profile/Profile';
import { getFullname } from './ProfileUtils';

export default function DisplayUserName({ email }) {
  const ready = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.publicProfilePublicationName);
    return subscription.ready();
  }, []);

  const profile = useTracker(() => Profiles.collection.findOne({ owner: email }), [email]);

  return (
    <p>{ ready ? getFullname(profile.firstName, profile.lastName) : email}</p>
  );
}

DisplayUserName.propTypes = {
  email: PropTypes.string,
};
