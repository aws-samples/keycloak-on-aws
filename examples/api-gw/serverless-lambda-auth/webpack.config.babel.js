const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const slsw = require('serverless-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const config = {
  mode: env,
  entry: slsw.lib.entries,
  target: 'node',
  node: {
    __dirname: false,
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: ['babel-loader'],
    },
    ],
  },
  plugins: [
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      '.': '__dirname',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../resources'),
          to: '.',
        },
      ],
    }),
  ],
  resolve: {
    modules: [
      path.join(__dirname, '.'),
      'node_modules',
    ],
  },
  stats: {
    colors: true,
  },
  devtool: false,
};

module.exports = config;
