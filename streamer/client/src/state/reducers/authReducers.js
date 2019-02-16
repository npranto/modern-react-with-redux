import { SIGN_IN } from './../actions/authActions';

const defaultState = {
  isAuthenticated: false,
  currentUser: null,
  message: '',
}

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SIGN_IN: {
      return {
        ...defaultState,
        message: action.message
      }
    }
    default: return defaultState;
  }
}

export default authReducer;
