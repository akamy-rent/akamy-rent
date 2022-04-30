import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const gridStyle = { height: '200px', fontSize: '50px', fontFamily: 'fantasy', paddingTop: '10%', color: 'white' };
    const menuStyle = { marginBottom: '50px' };
    return (
      <div id='landing-page' className='landingBG' style={menuStyle}>
        <div style={gridStyle}>
          <Grid centered container>
            AkaMy-Rent
          </Grid>
        </div>
        <Header style={{ marginBottom: '5%' }} as='h1' inverted textAlign='center'> Smart Contract</Header>
        <Grid verticalAlign='middle' textAlign='center' container>
          <Grid.Row style={{ marginBottom: '10%' }} columns={3}>
            <Grid.Column>
              <Header as='h2' inverted>
                Distributed
              </Header>
              <Header as='h4' inverted>
                Copied and shared across nodes in a peer-to-peer network. The resources
                are shared directly between nodes bypassing third party servers.
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Header as='h2' inverted>
                Immutable
              </Header>
              <Header as='h4' inverted>
                The blockchain ledger remains permanent and indelible retaining an unalterable history of transactions. This brings trust and integrity to the data on
                a daily basis.
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Header as='h2' inverted>
                Public
              </Header>
              <Header as='h4' inverted>
                No restrictions to the network. User accounts have public addresses to which transactions can be sent and are controlled by the holders.
              </Header>
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </div>
    );
  }
}

export default Landing;
