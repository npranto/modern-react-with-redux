import { GET_STREAMS } from './../actions/streamsActions';

const defaultState = [];

const streamsReducer = (state = defaultState, { type, streams }) => {
  switch(type) {
    case GET_STREAMS: {
      return [
        ...streams,
      ]
    }
    default: return state;
  }
}

export default streamsReducer;
