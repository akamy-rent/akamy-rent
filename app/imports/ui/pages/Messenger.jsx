import React, { useCallback, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Loader } from 'semantic-ui-react';
import { useTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import ChatDisplay from '../components/chat/ChatDisplay';
import ChatFeed from '../components/chat/ChatFeed';
import { Groups } from '../../api/group/Group';

export default function Messenger() {
  // Data loading
  const ready = useTracker(() => {
    const subscription = Meteor.subscribe(Groups.userPublicationName);
    return subscription.ready();
  }, []);
  const groups = useTracker(() => Groups.collection.find().fetch(), []);
  const user = useTracker(() => Meteor.user(), []);

  // State to track selected group for displaying messages
  const [group, setGroup] = useState();
  const handleSetGroup = useCallback((groupSelection) => {
    setGroup(groupSelection);
  }, [group]);

  const handleInputSubmission = (message) => {
    if (message === '') {
      return;
    }

    const createdby = user.username;
    const createdat = new Date();
    const content = {
      type: 'text',
      text: message,
    };
    const data = { createdat, createdby, content };
    Groups.collection.update(
      { _id: group._id },
      {
        $push: {
          messages: {
            $each: [data],
            // sort can be used to reorder all elements in the array.
            // not working in minimongo due to https://forums.meteor.com/t/push-and-sort-a-couple-separated-by-slice/13699/3
            // $sort: { createdat: 1 },
          },
        },
      }, (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        }
      },
    );
  };

  if (!ready) {
    return (
      <Loader active>Getting data</Loader>
    );
  }
  return (
    <Grid id="messenger-page" stackable padded >
      <Grid.Row>
        <Grid.Column width={4} >
          <ChatFeed setGroupFn={handleSetGroup} groups={groups} />
        </Grid.Column>
        <Grid.Column width={12} style={{ height: '85vh' }}>
          <ChatDisplay groupid={group?._id} inputSubmitFn={handleInputSubmission}/>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
