import merge from 'webpack-merge';
import baseConfig from './base';


const {
  WEBPACK_DEV_SERVER_URL,
  WEBPACK_DEV_SERVER_PORT,
  PUBLIC_PATH,
} = process.env;


const webpackDevServerUrl = `${WEBPACK_DEV_SERVER_URL}:${WEBPACK_DEV_SERVER_PORT}`;


const devConfig = {
  devtool: 'inline-source-map',

  output: {
    publicPath: `${webpackDevServerUrl}${PUBLIC_PATH}`,
  },
};


export default merge(baseConfig, devConfig);
