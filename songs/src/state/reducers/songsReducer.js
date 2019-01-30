import { SELECT_SONG } from './../actions/songsActions';

const defaultState = {
  songs: [
    {
      title: ''
    }
  ],
  selectedSong: null,
}

const songReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SELECT_SONG': {
      return {
        ...state
      }
    }
    default: return state;
  }
}
