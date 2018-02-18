const webpack = require('webpack');
const merge = require('webpack-merge');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const pkg = require('../package.json');

const publicPath = `http://chengkai.wang/${pkg.name}/${pkg.version}/`;

module.exports = merge(baseConfig, {
  output: {
    publicPath,
    filename: 'static/js/[name]-[chunkhash].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
      },
    }),
    new ExtractTextPlugin({
      filename: 'static/css/[name]-[chunkhash].css',
      allChunks: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      sourceMap: true,
    }),
  ],
});