import React from 'react';
import { List, Header, Grid } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class BottomHalf extends React.Component {
  render() {
    const gridStyle = { height: '200px', textAlign:'left' };
    return (

      <Grid centered>
        <div style={gridStyle}>
          <Header>Smart Contract</Header>
          <List bulleted >
            <List.Item> Distributed</List.Item>
            <List.Item> Immutable </List.Item>
            <List.Item> Public </List.Item>
          </List>
        </div>
      </Grid>

    );
  }
}

export default BottomHalf;
