import webpack from 'webpack';
import merge from 'webpack-merge';
import { server } from 'universal-webpack/config';
import settings from '../universal-webpack-settings.json';
import baseConfig from '../webpack.config';

import loadAppConfig from '../../src/config';


loadAppConfig();


const serverConfig = {

  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __SERVER__: true,
      __DEVTOOLS__: false,
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
  ],
};
const config = merge(baseConfig, serverConfig);


export default server(config, settings);
