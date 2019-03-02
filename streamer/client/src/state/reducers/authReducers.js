import { SETUP_AUTH, UPDATE_AUTH_STATUS } from './../actions/authActions';

const defaultState = {
  isAuthenticated: false,
  currentUser: null,
}

const authReducer = (state = defaultState, { type, isAuthenticated, currentUser }) => {
  switch (type) {
    case SETUP_AUTH: {
      return {
        ...state,
        isAuthenticated,
        currentUser,
      }
    }
    case UPDATE_AUTH_STATUS: {
      return {
        ...state,
        isAuthenticated,
        currentUser,
      }
    }
    default: return state;
  }
}

export default authReducer;
