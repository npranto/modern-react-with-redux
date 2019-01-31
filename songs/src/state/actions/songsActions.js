import axios from 'axios';
import songs from './../../api/songs.json';

export const SELECT_SONG = 'SELECT_SONG';
export const FETCH_SONGS = 'FETCH_SONGS';

export const selectSong = song => dispatch => {
  dispatch({
    type: 'SELECT_SONG',
    payload: song,
  });
};

export const fetchSongs = () => dispatch => {
  dispatch({
    type: 'FETCH_SONGS',
    payload: songs,
  });
}

