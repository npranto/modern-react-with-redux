import API from '../../api';

export const CREATE_NEW_STREAM = 'CREATE_NEW_STREAM';
export const GET_STREAMS = 'GET_STREAMS';

export const createStream = (newStream) => {
  return async (dispatch) => {
    const { data } = await API.streams.createStream(newStream);
    if (data) {   // successfully created a new stream
      dispatch({
        type: CREATE_NEW_STREAM,
      })
      dispatch(getStreams());
    }
  }
}

export const getStreams = () => {
  return async (dispatch) => {
    const { data } = await API.streams.getStreams();
    if (data) {   // successfully retrieved all streams
      dispatch({
        type: 'GET_STREAMS',
        streams: data
      })
    }
  }
}

export const getStream = (streamId) => {
  return (dispatch) => {
    // const { data } = API.streams
  }
}
