import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import DevTools from 'app/components/DevTools';

import rootReducers from './reducers';


export default (history, initialState = {}) => {
  const middlewares = applyMiddleware(
    routerMiddleware(history),
  );

  const store = createStore(
    rootReducers,
    initialState,
    compose(
      middlewares,
      __DEVTOOLS__ ? DevTools.instrument() : f => f,
    ),
  );

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers'));
    });
  }

  return store;
}