import webpack from 'webpack';
import merge from 'webpack-merge';
import { client } from 'universal-webpack/config';
import settings from '../universal-webpack-settings.json';
import baseConfig from '../webpack.config';

import loadAppConfig from '../../src/config';


loadAppConfig();


const clientConfig = {
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify(process.env.API_URL),
      },
      __CLIENT__: true,
      __SERVER__: false,
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
  ],
};
const config = merge(baseConfig, clientConfig);


export default (options) => client(config, settings, options);
