import { GET_STREAMS, CREATE_NEW_STREAM } from './../actions/streamsActions';

const defaultState = [];

const streamsReducer = (state = defaultState, action) => {
  switch(action.type) {
    case CREATE_NEW_STREAM: {
      return [
        ...state,
        action.newStream,
      ]
    }
    case GET_STREAMS: {
      return [
        ...state,
        ...action.streams,
      ]
    }
    default: return state;
  }
}

export default streamsReducer;
