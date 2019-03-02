import React, { Component } from 'react';
import { connect } from 'react-redux';

import AuthService from '../../services/Auth';
import { setupAuth, getAuthStatus, signIn, signOut } from '../../state/actions/authActions';
import { isAuthenticated } from './../../helpers/authHelpers';

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

  async componentDidMount() {
    if (!this.isSignedIn()) {
      await this.props.setupAuth();
    }
    this.props.getAuthStatus();
  }

  onSignIn = () => {
    this.props.signIn();
  }

  onSignout = () => {
    this.props.signOut();
  }

  render() {
    return !isAuthenticated(this.props.auth)
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
