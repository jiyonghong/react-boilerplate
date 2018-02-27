import merge from 'webpack-merge';
import baseConfig from './base';


const {
  PUBLIC_PATH,
} = process.env;


const prodConfig = {
  devtool: 'inline-source-map',

  output: {
    publicPath: PUBLIC_PATH,
  }
};


export default merge(baseConfig, prodConfig);
