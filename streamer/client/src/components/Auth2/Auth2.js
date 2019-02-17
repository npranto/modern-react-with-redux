import React, { Component } from 'react';
import { connect } from 'react-redux';

import AuthService from '../../services/Auth';
import { setupAuth, getAuthStatus, signIn, signOut } from '../../state/actions/authActions';

const Login = ({ onSignIn }) => (
  <button className="ui google plus button" onClick={() => onSignIn()}>
    <i className="google plus icon"></i>
    Login w/ Google
  </button>
);

const Logout = ({ onSignout }) => (
  <button className="ui negative basic button" onClick={() => onSignout()}>Logout</button>
);

class Auth2 extends Component {
  isSignedIn = () => {
    return AuthService.isSignedIn();
  }

  componentDidMount() {
    this.props.setupAuth();
  }

  onSignIn = () => {
    this.props.signIn();
  }

  onSignout = () => {
    this.props.signOut();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return !isAuthenticated
      ? <Login onSignIn={this.onSignIn} />
      : <Logout onSignout={this.onSignout} />
  }
};

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  }
}

const mapDispatchToProps = {
  setupAuth,
  getAuthStatus,
  signIn,
  signOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth2);
