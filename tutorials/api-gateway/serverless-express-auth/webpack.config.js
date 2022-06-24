const webpack = require('webpack');
const path = require('path')
const slsw = require('serverless-webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin');

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: env,
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  plugins: [
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
}
