const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ],
        flexbox: 'no-2009',
      }),
    ],
  },
};
module.exports = {
  bail: true,
  stats: {
    children: false, // 阻止插件打印信息
  },
  context: path.join(__dirname, '..'),
  entry: {
    app: [
      require.resolve('babel-polyfill'),
      './src/front-end/index.js',
    ],
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'static/js/[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '#': path.resolve(__dirname, '../src/front-end'),
    },
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'es2017', 'stage-2'],
            plugins: [
              'transform-runtime',
              'syntax-dynamic-import',
              'transform-decorators-legacy',
              ['transform-class-properties', { spec: true }],
              'lodash',
            ],
          },
        },
        exclude: /node_modules/,
      },
      {
        exclude: [
          /\.ejs$/,
          /\.html$/,
          /\.(js|jsx)(\?.*)?$/,
          /\.(ts|tsx)(\?.*)?$/,
          /\.css$/,
          /\.s(c|a)ss$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
          /\.json$/,
          /\.svg$/,
          /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        ],
        loader: 'file-loader',
        options: {
          name: `static/media/[name].[ext]?t=${new Date().getTime()}`,
        },
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        loader: 'url-loader',
        options: {
          limit: 4096,
          name: `static/media/images/[name].[ext]?t=${new Date().getTime()}`,
        },
      },
      {
        test: [/\.(woff2?|eot|ttf|otf)(\?.*)?$/],
        loader: 'file-loader',
        options: {
          name: `static/media/fonts/[name].[ext]?t=${new Date().getTime()}`,
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true,
            },
          }, postcssLoader],
        }),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true,
            },
          }, postcssLoader, 'sass-loader'],
        }),
      },
    ],
  },
  plugins: [
    new LodashModuleReplacementPlugin({
      collections: true,
      paths: true,
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/front-end/static'),
        to: path.resolve(__dirname, '../dist/static')
      }
    ]),
    // clean the dist
    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname, '../'),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/front-end/assets/index.html')
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0 && module.resource.indexOf('antd') === -1
        );
      },
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor'],
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
};