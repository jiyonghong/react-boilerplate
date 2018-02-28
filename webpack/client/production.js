import webpack from 'webpack';
import merge from 'webpack-merge';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

import getBaseConfig from './base';


const baseConfig = getBaseConfig({
  development: false,
  cssBundle: true,
});


const {
  PUBLIC_PATH,
} = process.env;


const vendors = [
  'react',
  'react-dom',
  'react-router',
  'react-router-dom',
];


const prodConfig = {
  devtool: 'cheap-module-source-map',

  entry: {
    vendors,
  },

  output: {
    publicPath: PUBLIC_PATH,
  },

  plugins: [
    new UglifyJSPlugin({
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        compress: true,
        ecma: 6,
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendors'],
      filename: '[name].[hash].js',
      minChunks: Infinity,
    }),
    new webpack.DefinePlugin({
      __DEVTOOLS__: false,
    })
  ]
}


export default merge(baseConfig, prodConfig);
