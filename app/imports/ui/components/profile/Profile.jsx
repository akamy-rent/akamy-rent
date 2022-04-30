import React from 'react';
import { Button, Grid, Header, Icon, Image, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';

class Profile extends React.Component {

  render() {
    const usermember = this.props.profile;
    const pb = (pct) => ({ paddingBottom: `${pct}%` });
    return (
      <Grid id='view-profile-page' style={{ ...pb(5) }}centered>
        <Grid.Row>
          <Grid.Column verticalAlign='top' textAlign='center' width={4}>
            <Image circular size='small' src={usermember.imageURL} centered />
            <br/>
            <Menu.Item id="toEditProfilePage" as={NavLink} exact to="/editProfile" link color='red'>
                Edit Profile
            </Menu.Item>
          </Grid.Column>
          <Grid.Column textAlign='center' width={4}>
            <Header as="h3">First Name</Header>
            <br/>
            {usermember.firstName}
            <br/>
            <Header as="h4">Phone Number</Header>
            <p>{usermember.phoneNumber}</p>
            <Button style={{ marginTop: '30%' }} as={NavLink} to="/add" size="big" color="black"><Icon name='file outline'></Icon>Create Contracts</Button>
          </Grid.Column>
          <Grid.Column textAlign='center' width={4}>
            <Header as="h3">Last Name</Header>
            <br/>
            {usermember.lastName}
            <Header as="h4">Wallet Address</Header>
            <p>{usermember.walletAddress}</p>
            <Button style={{ marginTop: '23%' }} as={NavLink} to="/chat" size="big" color="black"><Icon name='envelope open outline'></Icon> Messenger</Button>
          </Grid.Column>
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
