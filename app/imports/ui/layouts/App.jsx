import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import AddSmartContract from '../pages/smart-contract/AddSmartContract';
import EditSmartContract from '../pages/smart-contract/EditSmartContract';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import Dashboard from '../pages/Dashboard';
import Messenger from '../pages/Messenger';
import TestContract from '../pages/smart-contract/TestContract';
import ListSmartContract from '../pages/smart-contract/ListSmartContract';
import ViewProfile from '../pages/profile/ViewProfile';
import EditProfile from '../pages/profile/EditProfile';
import ListSmartContractAdmin from '../pages/smart-contract/ListSmartContractAdmin';
import SignSmartContract from '../pages/smart-contract/SignSmartContract';
import ViewSmartContract from '../pages/smart-contract/ViewSmartContract';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/signout" component={Signout}/>
            <Route path="/test" component={TestContract}/>
            <ProtectedRoute path="/dashboard" component={Dashboard}/>
            <ProtectedRoute path="/list" component={ListSmartContract}/>
            <ProtectedRoute path="/add" component={AddSmartContract}/>
            <ProtectedRoute path="/edit/:_id" component={EditSmartContract}/>
            <ProtectedRoute path="/sign/:_id" component={SignSmartContract}/>
            <ProtectedRoute path="/view/:_id" component={ViewSmartContract}/>
            <ProtectedRoute path="/chat" component={Messenger}/>
            <ProtectedRoute path="/editProfile" component={EditProfile}/>
            <ProtectedRoute path="/viewProfile" component={ViewProfile}/>
            <AdminProtectedRoute path="/admin" component={ListSmartContractAdmin}/>
            <Route component={NotFound}/>
          </Switch>
          <Footer/>
        </div>
      </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      return (isLogged && isAdmin) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
