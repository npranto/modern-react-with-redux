import { SELECT_SONG, FETCH_SONGS } from './../actions/songsActions';

const defaultState = {
  songs: [],
  selectedSong: null,
}

const songsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SELECT_SONG: {
      return {
        ...state,
        selectedSong: action.payload,
      }
    }
    case FETCH_SONGS: {
      return {
        ...state,
        songs: action.payload,
      }
    }
    default: return state;
  }
};

export default songsReducer;

