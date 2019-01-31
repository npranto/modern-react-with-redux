import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk' // no changes here 😀
import logger from 'redux-logger'

import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(logger, thunk));

export default store;
