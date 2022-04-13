import React from 'react';
import { Container, Menu, Icon, Header } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px'};
    return (
      <footer>
        <Menu className="secondary" inverted>
          <Container style={divStyle}>
            <Menu.Item className="left"><Header as='h3' inverted>AkaMy-Rent</Header></Menu.Item>
            <Menu.Item ><Icon className="twitter" size='big'/></Menu.Item>
            <Menu.Item ><Icon className="facebook f" size='big'/></Menu.Item>
            <Menu.Item className="right"><Header as='h3' inverted>Contact Us</Header></Menu.Item>
          </Container>
        </Menu>
      </footer>
    );
  }
}

export default Footer;
