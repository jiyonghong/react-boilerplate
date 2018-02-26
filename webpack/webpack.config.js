import webpack from 'webpack';
import path from 'path';


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
    path: distPath,
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
    ]
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
  ],
};
