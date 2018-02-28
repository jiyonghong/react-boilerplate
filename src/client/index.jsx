import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createStore from 'app/redux/store';
import createHistory from 'history/createBrowserHistory';

import { loadComponents } from  'loadable-components';

import DevTools from 'app/components/DevTools';


const history = createHistory();
const store = createStore(history, window.__INITIAL_STATE__);

const rootEl = document.getElementById('root');


const renderApp = () => {
  const App = require('../app/containers/AppContainer');
  const AppWithDevTools = __DEVTOOLS__ ? () => (
    <div>
      <App />
      <DevTools />
    </div>
  ) : App;


  loadComponents().then(() => {
    ReactDOM.hydrate(
      <AppContainer>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <AppWithDevTools />
          </ConnectedRouter>
        </Provider>
      </AppContainer>,
      rootEl,
    );
  });
};


// hot module reloading
if (module.hot) {
  const reRenderApp = () => {
    try {
      renderApp();
    } catch (error) {
      const RedBox = require('redbox-react');
      ReactDOM.render(<RedBox error={error} />, rootEl);
    }
  };

  module.hot.accept('../app/containers/AppContainer', () => {
    setImmediate(() => {
      // Preventing the hot reloading error from react-router
      ReactDOM.unmountComponentAtNode(rootEl);
      reRenderApp();
    });
  });
}


renderApp();
