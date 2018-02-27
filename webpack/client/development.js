import webpack from 'webpack';
import merge from 'webpack-merge';
import getBaseConfig from './base';


const baseConfig = getBaseConfig({
  development: true,
  cssBundle: true,
});


const webpackDevServerUrl = 'http://localhost:3001';


const baseEntryApp = baseConfig.entry.app.pop();
const app = [
  'babel-polyfill',
  'react-hot-loader/patch',
  `webpack-dev-server/client?${webpackDevServerUrl}`,
  'webpack/hot/only-dev-server',
  baseEntryApp,
];
// reset app
baseConfig.entry.app = []


const devConfig = {
  devtool: 'cheap-module-eval-source-map',
  
  entry: {
    app,
  },

  output: {
    publicPath: `${webpackDevServerUrl}${baseConfig.output.publicPath}`,
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};


export default merge(baseConfig, devConfig);
