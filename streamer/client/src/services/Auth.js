import keys from '../config/keys';

const loadGoogleAPIClient = () => {
  return new Promise((resolve, reject) => {
    window.gapi.load('client',
      async () => {
        await initializeClient();
        resolve();
      },    // Handle gapi.client initialization.
      () => handleFailedToLoadClient(),         // Handle loading error.
      10000,                                    // 10 seconds
      () => handleExtremeDelayToLoadClient(),   // Handle timeout.
    );
  })
};

const initializeClient = async () => {
    await window.gapi.client.init({
      client_id: keys && keys.gapi && keys.gapi.client_id,
      scope: 'email',
    }).then(async () => {
      window.auth = createAuthInstance();
      console.log({ isSignedIn: isSignedIn() });
      trackAuthChange();
    }).catch(e => alert('Unable to initialize a client on Google'))
};

const createAuthInstance = () => window.gapi && window.gapi.auth2 && window.gapi.auth2.getAuthInstance();

export const trackAuthChange = () => isSignedIn && window.auth.isSignedIn.listen();

export const isSignedIn = () => window.auth && window.auth.isSignedIn && window.auth.isSignedIn.get();

export const signIn = () => {
  return new Promise((resolve, reject) => {
    window.auth.signIn()
      .then(signedIn => resolve(getUser()))
      .catch(error => {
        console.log('Unable to sign in at the moment. Try again later\n', error);
        reject({
          message: 'Unable to sign in at the moment. Try again later',
          error,
        })
      })
  })
}

export const signOut = () => {
  return new Promise((resolve, reject) => {
    window.auth.signOut()
      .then(() => resolve(true))
      .catch(error => {
        console.log('Unable to sign out at the moment\n', error);
        reject({
          message: 'Oops, unable to sign out... Awkward!',
          error,
        })
      })
  })
}

export const getUser = () => {
  const profile = isSignedIn() && window.auth.currentUser.get().getBasicProfile();
  return {
    id: profile && profile.getId(),
    firstName: profile && profile.getGivenName(),
    lastName: profile && profile.getFamilyName(),
    fullName: profile && profile.getName(),
    email: profile && profile.getEmail(),
    avatar: profile && profile.getImageUrl(),
  }
}

const handleFailedToLoadClient = () => {
  console.error('gapi.client failed to load!');
};

const handleExtremeDelayToLoadClient = () => {
  console.error('gapi.client could not load in a timely manner!');
};

export const setup = async () => {
  return new Promise(async (resolve, reject) => {
    await loadGoogleAPIClient();
    resolve();
  })

}

export default {
  setup,
  signIn,
  isSignedIn,
  getUser,
  signOut,
  trackAuthChange
}


