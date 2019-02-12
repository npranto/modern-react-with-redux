import React, { Component } from 'react';

import keys from '../../config/keys';

// Login with Google button
const LoginWithGoogleButton = ({ onSignIn }) => (
  <button className="ui google plus button" onClick={() => onSignIn()}>
    <i className="google plus icon"></i>
    Login w/ Google
  </button>
);

// Default login button
const Login = props => <button className="ui button">Login</button>;

// Default logout button
const Logout = props => <button className="ui negative basic button">Logout</button>

class Auth extends Component {
  state = {
    isAuthenticated: false,
    currentUser: null,
  }

  static createAuthInstance = () => {
    return window.gapi.auth2.getAuthInstance();
  }

  static isSignedIn = () => {
    return this.auth.isSignedIn.get();
  }

  static listenForAuthStatusChange = () => {
    return this.auth.isSignedIn.listen(() => {
      this.setState({
        isAuthenticated: this.isSignedIn()
      })
    })
  }

  static initializeClient = () => {
    window.gapi.client.init({
      client_id: keys && keys.gapi && keys.gapi.client_id,
      scope: 'email',
    }).then(() => {
      this.auth = this.createAuthInstance();
      console.log(this.auth);
    }).catch(e => alert('Unable to initialize a client on Google'))
  }

  handleFailedToInitializeClient = () => {
    alert('gapi.client failed to load!');
  }

  handleExtremeDelayToInitializeClient = () => {
    alert('gapi.client could not load in a timely manner!');
  }

  static loadGApi = () => {
    window.gapi.load('client',
      async () => {
        await this.initializeClient()   // Handle gapi.client initialization.
      },
      () => {
        this.handleFailedToInitializeClient()   // Handle loading error.
      },
      10000, // 10 seconds (The number of milliseconds to wait before calling the ontimeout function, if the libraries still haven't loaded)
      () => {
        this.handleExtremeDelayToInitializeClient();    // Handle timeout.
      }
    );
  }

  componentDidMount() {
    this.loadGApi();
  }

  //////////

  signIn = () => {
    return new Promise((resolve, reject) => {
      this.auth.signIn()
        .then(signInResponse => {
          this.setState((prevState, props) => ({
            isAuthenticated: this.isSignedIn(),
          }));
          resolve(true);
        })
        .catch(err => {
          console.log('Failed to signIn()\n', err);
          reject(err)
        })
    })
  }

  signOut = () => {
    return new Promise((resolve, reject) => {
      this.auth.signOut()
        .then(() => {
          this.setState((prevState, props) => ({
            isAuthenticated: this.isSignedIn(),
          }));
          resolve(true);
        })
        .catch(err => {
          console.log('Failed to signOut()\n', err);
          reject(err)
        })
    })
  }

  render() {
    <Component
      {...this.props}
      {...this.state}
      signIn={this.signIn}
      signOut={this.signOut}
    />
  }
};

export default Auth;
