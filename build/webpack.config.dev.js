const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const baseConfig = require('./webpack.config.base');
const pkg = require('../package.json');

const isLocal = process.env.NODE_ENV === 'local';
const prefix = `http://chengkai.wang/${pkg.name}/${pkg.version}/`;

module.exports = merge(baseConfig, {
  devtool: isLocal ? 'source-map' : '',
  devServer: {
    stats: { children: false },
    hot: true,
    open: true,
    contentBase: path.join(__dirname, '../dist'),
    compress: false,
    port: 3000,
    quiet: false,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '/api': {
        target: 'http://localhost:8081/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {'^/api' : ''},
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: 'static/css/[name].css',
      allChunks: true,
    }),
  ],
});