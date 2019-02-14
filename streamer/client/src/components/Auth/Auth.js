import React, { Component } from 'react';

import keys from '../../config/keys';

// Login with Google button
const Login = ({ onSignIn }) => (
  <button className="ui google plus button" onClick={() => onSignIn()}>
    <i className="google plus icon"></i>
    Login w/ Google
  </button>
);

// Logout with Google button
const Logout = ({ onLogout }) => (
  <button className="ui negative basic button" onClick={() => onLogout()}>Logout</button>
);

const defaultState = {
  isAuthenticated: false,
  currentUser: null,
}

class Auth extends Component {
  state = {
    ...defaultState,
  }

  createAuthInstance = () => {
    return window.gapi.auth2.getAuthInstance();
  }

  isSignedIn = () => {
    return this.auth.isSignedIn.get();
  }

  getUserProfile = (signInResponse) => {
    if (!signInResponse) return null;
    const basicProfile = signInResponse.getBasicProfile();
    return {
      id: basicProfile && basicProfile.getId(),
      firstName: basicProfile && basicProfile.getGivenName(),
      lastName: basicProfile && basicProfile.getFamilyName(),
      fullName: basicProfile && basicProfile.getName(),
      email: basicProfile && basicProfile.getEmail(),
      avatar: basicProfile && basicProfile.getImageUrl(),
    }
  }

  listenForAuthStatusChange = () => {
    return this.auth.isSignedIn.listen(() => {
      this.setState({
        isAuthenticated: this.isSignedIn()
      })
    })
  }

  initializeClient = () => {
    window.gapi.client.init({
      client_id: keys && keys.gapi && keys.gapi.client_id,
      scope: 'email',
    }).then(() => {
      this.auth = this.createAuthInstance();
      console.log(this.auth);
      this.listenForAuthStatusChange();
    }).catch(e => alert('Unable to initialize a client on Google'))
  }

  handleFailedToLoadClient = () => {
    alert('gapi.client failed to load!');
  }

  handleExtremeDelayToLoadClient = () => {
    alert('gapi.client could not load in a timely manner!');
  }

  loadGApi = () => {
    window.gapi.load('client',
      async () => {
        await this.initializeClient()   // Handle gapi.client initialization.
      },
      () => {
        this.handleFailedToLoadClient()   // Handle loading error.
      },
      // 10 seconds (The number of milliseconds to wait before calling the ontimeout function,
      // if the libraries still haven't loaded)
      10000,
      () => {
        this.handleExtremeDelayToLoadClient();    // Handle timeout.
      }
    );
  }

  componentDidMount() {
    this.loadGApi();
  }

  signIn = () => {
    return new Promise((resolve, reject) => {
      this.auth.signIn()
        .then(signInResponse => {
          // const currentUser = this.getUserProfile(signInResponse);
          this.setState(() => ({
            isAuthenticated: this.isSignedIn(),
            currentUser: this.getUserProfile(signInResponse),
          }));
          resolve(true);
        })
        .catch(err => {
          console.log('Unable to sign in at the moment\n', err);
          reject(err)
        })
    })
  }

  signOut = () => {
    return new Promise((resolve, reject) => {
      this.auth.signOut()
        .then(() => {
          this.setState(() => ({
            isAuthenticated: this.isSignedIn(),
            ...defaultState,
          }));
          resolve(true);
        })
        .catch(err => {
          console.log('Unable to sign out at the moment\n', err);
          reject(err)
        })
    })
  }

  render() {
    console.log({ isAuthenticated: this.state.isAuthenticated });
    console.log({ currentUser: this.state.currentUser });
    return !this.state.isAuthenticated
      ? <Login onSignIn={this.signIn} />
      : <Logout onLogout={this.signOut} />
  }
};

export default Auth;
