import React from 'react';
import { Header, Grid, Container } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class BottomHalf extends React.Component {
  render() {
    const gridStyle = { height: '200px', textAlign: 'left' };
    return (
      <div className="landingBG">
        <Grid centered>
          <Grid.Row> <Header inverted> Smart Contract</Header></Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Header inverted>
              Distributed
              </Header>
                <Header as='h5' inverted>
                  This address book enables any number of users to register and save their
                  business contacts. You can only see the contacts you have created.
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Header inverted>
              Immutable
              </Header>
                <Header as='h5' inverted>
                  This address book enables any number of users to register and save their
                  business contacts. You can only see the contacts you have created.

              </Header>
            </Grid.Column>
            <Grid.Column>
              <Header inverted>
              Public
              </Header>
              <Header as='h5' inverted>
                This address book enables any number of users to register and save their
                business contacts. You can only see the contacts you have created.
              </Header>
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </div>
    );
  }
}

export default BottomHalf;
