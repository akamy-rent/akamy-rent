import React from 'react';
import { Header, Grid, Container } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class BottomHalf extends React.Component {
  render() {
    const gridStyle = { height: '200px', textAlign: 'left' };
    return (
      <div className="landingBG">
        <Grid centered className="landingBG">
          <Grid.Row> <Header> Smart Contract</Header></Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>Distributed</Grid.Column>
            <Grid.Column> Immutable </Grid.Column>
            <Grid.Column>Public</Grid.Column>
          </Grid.Row>

        </Grid>
      </div>
    );
  }
}

export default BottomHalf;
