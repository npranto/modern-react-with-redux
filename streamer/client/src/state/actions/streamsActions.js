import API from '../../api';

export const CREATE_NEW_STREAM = 'CREATE_NEW_STREAM';
export const GET_STREAMS = 'GET_STREAMS';
export const GET_STREAM = 'GET_STREAM';
export const UPDATE_STREAM = 'UPDATE_STREAM';
export const DELETE_STREAM = 'DELETE_STREAM';

export const createStream = (newStream) => {
  return async (dispatch, getState) => {
    const { auth } = getState();
    console.log({ auth });
    // const { currentUser } = auth;

    // const userId = currentUser && currentUser.id;

    // try {
    //   const { data } = await API.streams.createStream({
    //     ...newStream,
    //     createdBy: userId
    //   });
    //   if (data) {   // successfully created a new stream
    //     dispatch({
    //       type: CREATE_NEW_STREAM,
    //     })
    //     dispatch(getStreams());
    //   }
    // }
    // catch(e) {
    //   throw new Error(e);
    // }
  }
}

export const getStreams = () => {
  return async (dispatch) => {
    try {
      const { data } = await API.streams.getStreams();
      if (data) {   // successfully retrieved all streams
        dispatch({
          type: GET_STREAMS,
          streams: data
        })
      }
    }
    catch(e) {
      throw new Error(e);
    }
  }
}

export const getStream = (streamId) => {
  return async (dispatch) => {
    try {
      const { data } = await API.streams.getStream(streamId);
      if (data) {
        dispatch({
          type: GET_STREAM,
        })
        dispatch(getStreams());
      }
    }
    catch(e) {
      throw new Error(e);
    }
  }
}

export const updateStream = (streamId, newStream) => {
  return async (dispatch) => {
    try {
      const { data } = await API.streams.updateStream(streamId, newStream);
      if (data) {
        dispatch({
          type: UPDATE_STREAM,
        })
        dispatch(getStreams());
      }
    }
    catch(e) {
      throw new Error(e);
    }
  }
}

export const deleteStream = (streamId) => {
  return async (dispatch) => {
    try {
      const { data } = await API.streams.deleteStream(streamId);
      if (data) {
        dispatch({
          type: DELETE_STREAM,
        })
        dispatch(getStreams());
      }
    }
    catch(e) {
      throw new Error(e);
    }
  }
}
