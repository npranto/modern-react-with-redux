import { combineReducers } from 'redux';

import songsReducer from './songsReducer';

const reducers = combineReducers({
  songs: songsReducer,
})

export default reducers;
