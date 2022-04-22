import React from 'react';
import { Grid, Image, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';

class Member extends React.Component {

  render() {
    const usermember = this.props.member;
    return (
      <Grid centered>
        <Grid.Row>
          <Grid columns={2} verticalAlign='middle'>
            <Grid.Column>
              <Image size='medium' src="/images/meteor-logo.png" rounded/>
            </Grid.Column>
            <Grid.Column>
              <Menu text>
                <Menu.Item as={NavLink} exact to="/editProfile/member" link color='red'>
                      Edit Profile
                </Menu.Item>
              </Menu>
            </Grid.Column>
          </Grid>
        </Grid.Row>
        <Grid.Row>
          {usermember.index}
        </Grid.Row>
        <Grid.Row>
          {usermember.email}
        </Grid.Row>
        <Grid.Row>
          {usermember.walletAddress}
        </Grid.Row>
      </Grid>
    );
  }
}

// Require a document to be passed to this component.
Member.propTypes = {
  member: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Member);
