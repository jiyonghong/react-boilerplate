import webpack from 'webpack';
import merge from 'webpack-merge';
import { client } from 'universal-webpack/config';
import settings from '../universal-webpack-settings.json';
import baseConfig from '../webpack.config';
import loadAppConfig from '../../config';


loadAppConfig();


const clientConfig = {
  plugins: [
    new webpack.DefinePlugin({
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
