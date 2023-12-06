const webpack = require('webpack');

// eslint-disable-next-line
module.exports = function (context, options) {
  return {
    name: 'node-polyfills',
    // eslint-disable-next-line
    configureWebpack(config, isServer, utils) {
      return {
        plugins: [
          new webpack.DefinePlugin({
            'process.env': JSON.stringify({}),
          }),
          new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
          }),
        ],
        resolve: {
          alias: {
          },
          fallback: {
            crypto: require.resolve('crypto-browserify'),
            http: require.resolve('stream-http'),
            https: require.resolve("https-browserify"),
            buffer: require.resolve('buffer'),
            stream: require.resolve("stream-browserify"),
          },
        },
      }
    },
  }
};