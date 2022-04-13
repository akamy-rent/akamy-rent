import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class TopHalf extends React.Component {
  render() {
    const gridStyle = { height: '200px', fontSize: '50px', fontFamily: 'fantasy', paddingTop: '10%', color: 'white'};
    return (
      <div style={gridStyle}>
        <Grid centered container>
          AkaMy-Rent

        </Grid>
      </div>

    );
  }
}

export default TopHalf;
