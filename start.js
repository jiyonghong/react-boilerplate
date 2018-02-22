import startServer from 'universal-webpack/server';
import settings from './webpack/universal-webpack-settings';
import config from './webpack/webpack.config';


startServer(config, settings);