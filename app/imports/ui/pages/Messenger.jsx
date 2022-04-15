import React, { useCallback, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import ChatDisplay from '../components/chat/ChatDisplay';
import ChatFeed from '../components/chat/ChatFeed';
import { groups, messages } from '../components/chat/ChatUtils';

export default function Messenger() {
  // state for the group selection
  const [groupName, setGroup] = useState();
  const handleSetGroup = useCallback((groupname) => {
    setGroup(groupname);
  }, [setGroup]);

  return (
    /** ToDo: Determine App Layout to force messenger to fill 100% of
     * screen between top navbar and footer.
     */
    <Grid stackable padded >
      <Grid.Row>
        <Grid.Column width={4} >
          <ChatFeed setGroupFn={handleSetGroup} groups={groups} />
        </Grid.Column>
        <Grid.Column width={12} style={{ height: '80vh' }}>
          <ChatDisplay groupName={groupName} messages={messages.filter(message => message.groupname === groupName)}/>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
