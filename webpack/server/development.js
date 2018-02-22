import merge from 'webpack-merge';
import baseConfig from './base';


const webpackDevServerUrl = 'http://localhost:3001';


const devConfig = {
  devtool: 'inline-source-map',

  output: {
    publicPath: `${webpackDevServerUrl}${baseConfig.output.publicPath}`,
  },
};


export default merge(baseConfig, devConfig);
