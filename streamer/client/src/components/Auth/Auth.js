import React, { Component } from 'react';

// To login with Google
const LoginWithGoogleButton = props => (
  <button className="ui google plus button">
    <i className="google plus icon"></i>
    Login w/ Google
  </button>
);

// Default login button
const Login = props => <button className="ui button">Login</button>;

class Auth extends Component {

  state = {
    isAuthenticated: false,
  }

  componentDidMount() {
    // window.gapi.load('client',
    //   () => {
    //     // Handle gapi.client initialization.
    //     window.gapi.client.init({
    //       client_id: '176049822610-ssmfek1csnk2s9h4g3o8lnk4f615ggle.apps.googleusercontent.com',
    //       scope: 'email',
    //     }).then(() => {
    //       this.auth = window.gapi.auth2.getAuthInstance();
    //       this.setState({ isAuthenticated: this.auth.isSignedIn.get() });
    //       this.auth.isSignedIn.listen(() => {
    //         this.setState({ isAuthenticated: this.auth.isSignedIn.get() })
    //       })
    //     }).catch(e => alert('Unable to initialize a client on Google'))
    //   },
    //   () => {
    //     // Handle loading error.
    //     alert('gapi.client failed to load!');
    //   },
    //   10000, // 10 seconds (The number of milliseconds to wait before calling the ontimeout function, if the libraries still haven't loaded.)
    //   () => {
    //     // Handle timeout.
    //     alert('gapi.client could not load in a timely manner!');
    //   }
    // );
  }

  render() {
    console.log(this.state);

    if (this.props.google) {
      return <LoginWithGoogleButton />
    }
    return <Login />
  }
};

export default Auth;
