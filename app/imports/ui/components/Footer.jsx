import React from 'react';
import { Container, Menu, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    return (
      <footer>
        <Menu className="secondary">
          <Container>
            <Menu.Item className="left">AkaMy-Rent</Menu.Item>
            <Menu.Item ><Icon className="twitter"/></Menu.Item>
            <Menu.Item ><Icon className="facebook f"/></Menu.Item>
            <Menu.Item className="right">Contact Us</Menu.Item>
          </Container>
        </Menu>
      </footer>
    );
  }
}

export default Footer;
