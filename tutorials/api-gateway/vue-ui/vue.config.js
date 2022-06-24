const path = require('path')
const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({
        'KEYCLOAK_CONFIG': JSON.stringify(require(path.join(__dirname, '../resources/keycloak.json')))
      }),
    ]
  },
  devServer: {
    host: 'localhost', // https://github.com/vuejs/vue-cli/issues/1616#issuecomment-536193059
    hot: true,
    disableHostCheck: true,
  },
}
