import React from 'react';
import { Grid, Image, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';

class Profile extends React.Component {

  render() {
    const usermember = this.props.profile;
    return (
        <Grid centered>
          <Grid.Row>
            <Grid columns={2} verticalAlign='middle'>
              <Grid.Column>
                <Image size='small' src={usermember.imageURL} rounded/>
              </Grid.Column>
              <Grid.Column>
                <Menu text>
                  <Menu.Item as={NavLink} exact to="/editProfile" link color='red'>
                    Edit Profile
                  </Menu.Item>
                </Menu>
              </Grid.Column>
            </Grid>
          </Grid.Row>
          <Grid.Row>
            {usermember.firstName}
          </Grid.Row>
          <Grid.Row>
            {usermember.lastName}
          </Grid.Row>
          <Grid.Row>
            {usermember.walletAddress}
          </Grid.Row>
        </Grid>
    );
  }
}

// Require a document to be passed to this component.
Profile.propTypes = {
  profile: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Profile);