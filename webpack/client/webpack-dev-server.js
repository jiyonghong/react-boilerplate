import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './development';


const {
  WEBPACK_DEV_SERVER_URL,
  WEBPACK_DEV_SERVER_PORT,
  PUBLIC_PATH,
} = process.env;


const publicPath = `${WEBPACK_DEV_SERVER_URL}:${WEBPACK_DEV_SERVER_PORT}${PUBLIC_PATH}`;


const devServerOptions = {
  quiet: true,
  noInfo: true,
  hot: true,
  publicPath,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/,
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  stats: {
    colors: true,
  },
  historyApiFallback: true,
};


const compiler = webpack(config);
new WebpackDevServer(compiler, devServerOptions)
  .listen(WEBPACK_DEV_SERVER_PORT, (error) => {
    if (error) {
      console.error(error.stack || error);
      throw error;
    }
  });
