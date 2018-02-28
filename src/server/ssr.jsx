import React from 'react';
import { renderToString } from 'react-dom/server';
import { PropTypes } from 'prop-types';

import { StaticRouter } from 'react-router';

import serialize from 'serialize-javascript';

import { Provider } from 'react-redux';
import createStore from 'app/redux/store';
import createHistory from 'history/createMemoryHistory';

import { getLoadableState } from 'loadable-components/server';

import App from 'app/containers/AppContainer';


const __PROD__ = process.env.NODE_ENV === 'production';


class Html extends React.Component {
  static propTypes = {
    // helmet: PropTypes.object.isRequired,
    root: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired,    
    preloadedAssets: PropTypes.object.isRequired,
    assets: PropTypes.object.isRequired,
  }

  render() {
    const {
      // helmet,
      root,
      state,      
      preloadedAssets,
      assets: { styles, javascript },
    } = this.props;

    return (
      <html lang="ko">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
          {/* {helmet.meta.toComponent()} */}
          {/* {helmet.title.toComponent()} */}
          {/* {helmet.link.toComponent()} */}
          <link rel="stylesheet" href={styles.app} />
        </head>
        <body>
          <div id="root">{root}</div>
          <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${serialize(state)}` }} />
          {__PROD__ && <script src={javascript.vendors} />}
          {preloadedAssets.getScriptElement()}
          <script src={javascript.app} />
        </body>
      </html>
    );
  }
}


export default assets => (req, res) => {
  const history = createHistory();
  const store = createStore(history);

  const context = {};
  const root = (
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );


  if (context.url) {
    res.redirect(301, context.url);
    return;
  }

  getLoadableState(root)
    .then((preloadedAssets) => {
      const state = store.getState();

      const html = renderToString(
        <Html
          root={root}
          state={state}
          preloadedAssets={preloadedAssets}
          assets={assets}
        />,
      );

      res.send(`<!DOCTYPE html>${html}`);
    });
};
