import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './development';


const devServerOptions = {
  quiet: true,
  noInfo: true,
  hot: true,
  // network path for static files: fetch all statics from webpack development server
  publicPath: config.output.publicPath,
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
  .listen(3001, (error) => {
    if (error) {
      console.error(error.stack || error);
      throw error;
    }
  });
