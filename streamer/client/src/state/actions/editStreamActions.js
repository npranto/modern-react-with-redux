export const SET_STREAM_TO_EDIT = 'SET_STREAM_TO_EDIT';
export const RESET_STREAM_TO_EDIT = 'SET_STREAM_TO_EDIT';

export const setStreamToEdit = (streamToEdit) => {
  return (dispatch) => {
    dispatch({
      type: SET_STREAM_TO_EDIT,
      streamToEdit,
    })
  }
};

export const resetStreamToEdit = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_STREAM_TO_EDIT
    })
  }
}


