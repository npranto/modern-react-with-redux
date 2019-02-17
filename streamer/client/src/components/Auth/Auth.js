import React, { Component } from 'react';

import AuthService from './../../services/Auth';

const Login = ({ onSignIn }) => (
  <button className="ui google plus button" onClick={() => onSignIn()}>
    <i className="google plus icon"></i>
    Login w/ Google
  </button>
);

const Logout = ({ onSignout }) => (
  <button className="ui negative basic button" onClick={() => onSignout()}>Logout</button>
);

const defaultState = {
  isAuthenticated: false,
  currentUser: null,
}

class Auth extends Component {
  state = {
    ...defaultState,
  }

  isSignedIn = () => {
    return AuthService.isSignedIn();
  }

  componentDidMount() {
    AuthService.setup();
  }

  onAuthChange() {
    const isAuthenticated = this.isSignedIn();
    this.setState({
      isAuthenticated,
      currentUser: isAuthenticated ? AuthService.getUser() : null
    })
  }

  signIn = () => {
    AuthService.signIn()
      .then(user => user && this.onAuthChange())
      .catch(error => console.log(error));
  }

  signOut = () => {
    AuthService.signOut()
      .then(isDone => isDone && this.onAuthChange())
      .catch(error => console.log(error));
  }

  render() {
    console.log({ isAuthenticated: this.state.isAuthenticated });
    console.log({ currentUser: this.state.currentUser });
    return !this.state.isAuthenticated
      ? <Login onSignIn={this.signIn} />
      : <Logout onSignout={this.signOut} />
  }
};

export default Auth;
