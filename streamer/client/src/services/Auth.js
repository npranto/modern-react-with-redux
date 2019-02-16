import keys from '../config/keys';

const loadGoogleAPIClient = () => {
  window.gapi.load('client',
    async () => {
      await initializeClient();   // Handle gapi.client initialization.
    },
    () => {
      handleFailedToLoadClient()   // Handle loading error.
    },
    // 10 seconds (The number of milliseconds to wait before calling the ontimeout function,
    // if the libraries still haven't loaded)
    10000,
    () => {
      handleExtremeDelayToLoadClient();    // Handle timeout.
    }
  );
};

const initializeClient = () => {
  window.gapi.client.init({
    client_id: keys && keys.gapi && keys.gapi.client_id,
    scope: 'email',
  }).then(() => {
    window.auth = createAuthInstance();
    trackAuthChange();
  }).catch(e => alert('Unable to initialize a client on Google'))
};

const createAuthInstance = () => {
  return window.gapi && window.gapi.auth2 && window.gapi.auth2.getAuthInstance();
}

const trackAuthChange = () => {
  isSignedIn && window.auth.isSignedIn.listen();
}

export const isSignedIn = () => {
  return window.auth && window.auth.isSignedIn && window.auth.isSignedIn.get();
}

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
      .then(() => {
        resolve(true);
      })
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
  const currentUser = isSignedIn() && window.auth.currentUser.get();
  const basicProfile = (currentUser && currentUser.getBasicProfile()) || {};
  return {
    id: basicProfile && basicProfile.getId(),
    firstName: basicProfile && basicProfile.getGivenName(),
    lastName: basicProfile && basicProfile.getFamilyName(),
    fullName: basicProfile && basicProfile.getName(),
    email: basicProfile && basicProfile.getEmail(),
    avatar: basicProfile && basicProfile.getImageUrl(),
  }
}

const handleFailedToLoadClient = () => {
  console.error('gapi.client failed to load!');
};

const handleExtremeDelayToLoadClient = () => {
  console.error('gapi.client could not load in a timely manner!');
};

export const setup = async () => {
  await loadGoogleAPIClient();
}

export default {
  setup,
  signIn,
  isSignedIn,
  getUser,
  signOut
}


