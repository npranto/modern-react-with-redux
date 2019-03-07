import { SET_STREAM_TO_EDIT, RESET_STREAM_TO_EDIT } from './../actions/editStreamActions';

const defaultState = {
  stream: null,
}

const editStreamReducer = (state = defaultState, action) => {
  switch(action.type) {
    case SET_STREAM_TO_EDIT: return {
      ...state,
      stream: action.streamToEdit,
    }
    case RESET_STREAM_TO_EDIT: return {
      ...state,
      ...defaultState,
    }
    default: return state;
  }
};

export default editStreamReducer;
