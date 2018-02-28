import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from './reducer';


export default (history, initialState = {}) => {
  const middlewares = [
    routerMiddleware(history),
  ];

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares),
  );
}