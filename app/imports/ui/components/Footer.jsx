import React from 'react';
import { Grid, Header, Icon, Loader } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  render() {
    const divStyle = { paddingTop: '15px' };
    return (
      <footer>
        <div style={divStyle} className="ui center aligned container">
          <hr />
          <br/>
          <Grid divided='vertically'>
          <Grid.Row columns={4}>
            <Grid.Column>
             <Header as='h3' inverted>Akamy Rent</Header>
            </Grid.Column>
            <Grid.Column>
              <Icon name='twitter' size='big'/>
              <Icon name='facebook' size='big'/>
            </Grid.Column>
            <Grid.Column>
              <Header as='h3' inverted>Contact Us</Header>
            </Grid.Column>
            <Grid.Column>
              <Header as='h3' inverted>About</Header>
            </Grid.Column>
          </Grid.Row>
          </Grid>
        </div>
      </footer>
    );
  }
}

export default Footer;
