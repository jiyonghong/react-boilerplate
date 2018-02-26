import React from 'react';
import { renderToString } from 'react-dom/server';
import { PropTypes } from 'prop-types';

import { StaticRouter } from 'react-router';

// import serialize from 'serialize-javascript';

import { getLoadableState } from 'loadable-components/server';

import App from 'app/containers/AppContainer';


const getProdStyles = styles => Object.keys(styles)
  .map(key => <link key={key} rel="stylesheet" href={styles[key]} />);


class Html extends React.Component {
  static propTypes = {
    // helmet: PropTypes.object.isRequired,
    // state: PropTypes.object.isRequired,
    root: PropTypes.object.isRequired,
    // context: PropTypes.object.isRequired,
    preloadedAssets: PropTypes.object.isRequired,
    assets: PropTypes.object.isRequired,
  }

  render() {
    const {
      // helmet,
      // state,
      root,
      // context,
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
          {getProdStyles(styles)}
        </head>
        <body>
          <div id="root">{root}</div>
          {/* <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${serialize(state)}` }} /> */}
          {/* {__PROD__ && <script src={javascript.vendor} />} */}
          {preloadedAssets.getScriptElement()}          
          {<script src={javascript.manifest} />}  
          <script src={javascript.app} />
        </body>
      </html>
    );
  }
}


export default assets => (req, res) => {
  const context = {};
  const root = (
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  if (context.url) {
    res.redirect(301, context.url);
    return;
  }

  getLoadableState(root)
    .then((preloadedAssets) => {
      const html = renderToString((
        <Html
          root={root}
          preloadedAssets={preloadedAssets}
          assets={assets}
        />
      ));

      res.send(`<!DOCTYPE html>${html}`);
    });
};
