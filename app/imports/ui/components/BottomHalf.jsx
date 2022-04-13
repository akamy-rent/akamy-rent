import React from 'react';
import { Header, Grid, Container } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class BottomHalf extends React.Component {
  render() {
    const gridStyle = { height: '200px', textAlign: 'left' };
    return (
      <div>
        <Grid centered container>
          <Grid.Row> <Header inverted> Smart Contract</Header></Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Header inverted>
              Distributed
              </Header>
                <Header as='h5' inverted>
                  Copied and shared across nodes in a peer-to-peer network. The resources
                  are shared directly between nodes bypassing third party servers.
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Header inverted>
              Immutable
              </Header>
                <Header as='h5' inverted>
                  The blockchain ledger remains permanent and indelible retaining an unalterable history of transactions. This brings trust and integrity to the data on
                  a daily basis.
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Header inverted>
              Public
              </Header>
              <Header as='h5' inverted>
                No restrictions to the network.
              </Header>
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </div>
    );
  }
}

export default BottomHalf;
