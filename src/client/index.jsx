import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';

import { BrowserRouter } from 'react-router-dom';


const rootEl = document.getElementById('root');

const renderApp = () => {
  const App = require('../app/containers/AppContainer');

  ReactDOM.render(
    <AppContainer>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppContainer>,
    rootEl,
  );
};


// hot module reloading
if (module.hot) {
  const reRenderApp = () => {
    try {
      renderApp();
    } catch (error) {
      const RedBox = require('redbox-react').default;
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