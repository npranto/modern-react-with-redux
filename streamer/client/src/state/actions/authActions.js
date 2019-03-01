import AuthService from './../../services/Auth';

// TYPES
export const SIGN_IN = 'SIGN_IN';
export const UPDATE_AUTH_STATUS = 'UPDATE_AUTH_STATUS';
export const SETUP_AUTH = 'SETUP_AUTH';

// ACTIONS
export const setupAuth = () => {
  return (async (dispatch) => {
    await AuthService.setup();
    await dispatch({
      type: SETUP_AUTH,
    });
    // await dispatch(getAuthStatus());
  })
}

export const getAuthStatus = () => {
  return ((dispatch) => {
    const isAuthenticated = AuthService.isSignedIn();
    const currentUser = isAuthenticated ? AuthService.getUser() : null;
    dispatch({
      type: UPDATE_AUTH_STATUS,
      isAuthenticated,
      currentUser,
    });
  })
}

export const signIn = () => {
  return ((dispatch) => {
    AuthService.signIn()
      .then(user => {
        if (user) {
          dispatch(getAuthStatus());
        }
      })
      .catch(error => console.log(error));
  });
}

export const signOut = () => {
  return ((dispatch) => {
    AuthService.signOut()
      .then(isDone => {
        if (isDone) {
          dispatch(getAuthStatus());
        }
      })
      .catch(error => console.log(error));
  });
}

