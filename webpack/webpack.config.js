import webpack from 'webpack';
import path from 'path';
import DotenvPlugin from 'dotenv-webpack';


const rootPath = path.resolve(__dirname, '../');
const srcPath = path.resolve(rootPath, 'src');
const distPath = path.resolve(rootPath, 'dist');


export default {
  context: rootPath,

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [srcPath, 'node_modules'],
    alias: {
      app: path.resolve(srcPath, 'app'),
      assets: path.resolve(srcPath, 'assets'),
      config: path.resolve(srcPath, 'config'),
    }
  },

  entry: {
    app: [
      'babel-polyfill',
      path.resolve(srcPath, 'client/index.jsx'),
    ],
  },

  output: {
    path: path.resolve(distPath, 'assets'),
    filename: '[name].[hash].js',
    publicPath: '/assets/'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              extends: path.resolve(rootPath, '.babelrc'),
            },
          },
        ],
        include: srcPath,
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]__[hash]',
              importLoaders: 2,
              sourceMap: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: path.resolve(rootPath, 'postcss.config.js'),
              }
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new DotenvPlugin({
      systemvars: true,
    }),
  ],
};
