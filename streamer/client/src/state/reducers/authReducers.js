import { SETUP_AUTH, UPDATE_AUTH_STATUS } from './../actions/authActions';

const defaultState = {
  isAuthenticated: false,
  currentUser: null,
}

const authReducer = (state = defaultState, { type, isAuthenticated, currentUser, message }) => {
  switch (type) {
    case SETUP_AUTH: {
      return {
        ...defaultState,
        isAuthenticated,
        currentUser,
      }
    }
    case UPDATE_AUTH_STATUS: {
      return {
        ...defaultState,
        isAuthenticated,
        currentUser,
      }
    }
    default: return defaultState;
  }
}

export default authReducer;
