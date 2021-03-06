const path = require('path')
const slsw = require('serverless-webpack')
// const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: 'production',
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  plugins: [
    // new CopyPlugin({})
  ]
}
