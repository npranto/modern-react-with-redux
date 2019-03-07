import { combineReducers } from 'redux';

import authReducer from './authReducers';
import streamsReducer from './streamsReducer';
import editStreamReducer from './editStreamReducer';

export default combineReducers({
  auth: authReducer,
  streams: streamsReducer,
  editStream: editStreamReducer,
});
