import { combineReducers } from 'redux';

import authReducer from './authReducers';
import streamsReducer from './streamsReducer';

export default combineReducers({
  auth: authReducer,
  streams: streamsReducer,
});
