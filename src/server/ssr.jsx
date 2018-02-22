import React from 'react';
import { renderToString } from 'react-dom/server';
import { PropTypes } from 'prop-types';

import { StaticRouter } from 'react-router';

import serialize from 'serialize-javascript';

import App from 'app/containers/AppContainer';


const getProdStyles = styles => Object.keys(styles)
  .map(key => <link key={key} rel="stylesheet" href={styles[key]} />);


class Html extends React.Component {
  static propTypes = {
    // helmet: PropTypes.object.isRequired,
    // state: PropTypes.object.isRequired,
    root: PropTypes.object.isRequired,
    // context: PropTypes.object.isRequired,
    assets: PropTypes.object.isRequired,
  }

  static defaultProps = {
    assets: {},
  }

  render() {
    const {
      // helmet,
      // state,
      root,
      // context,
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
          {/* {__PROD__ && <script src={javascript.manifest} />} */}
        </head>
        <body>
          <div id="root">{root}</div>
          {/* <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${serialize(state)}` }} /> */}
          {/* {__PROD__ && <script src={javascript.vendor} />} */}
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
    return res.redirect(301, context.url);
  }

  const html = renderToString((
    <Html
      root={root}
      assets={assets}
    />
  ));

  res.send(`<!DOCTYPE html>${html}`);
};
