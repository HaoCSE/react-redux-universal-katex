var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StyleLintPlugin = require('stylelint-webpack-plugin');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')

var webpackIsomorphicToolsPlugin =
  // webpack-isomorphic-tools settings reside in a separate .js file
  // (because they will be used in the web server code too).
  new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'))
  // also enter development mode since it's a development webpack configuration
  // (see below for explanation)

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './common/client.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new StyleLintPlugin(),
    // new ExtractTextPlugin('style.css')
    webpackIsomorphicToolsPlugin.development()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: __dirname,
        options: {
          presets: [ 'react-hmre' ]
        }
      },
      // { test: /(\.scss$)/,
      //   loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
      // }
      // { test: /\.scss$/, loader: 'style-loader!css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass-loader?outputStyle=expanded&sourceMap' }
      // {
      //   test: /\.scss$/,
      //   use: [
      //     {
      //       loader: "style-loader" // creates style nodes from JS strings
      //     },
      //     {
      //       loader: "css-loader" // translates CSS into CommonJS
      //     },
      //     {
      //       loader: "sass-loader" // compiles Sass to CSS
      //     }
      //   ]
      // }
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     {loader: 'css-loader', options: {importLoaders: 1}},
      //     'postcss-loader',
      //   ],
      // },
      // {
      //   test: /\.scss$/,
      //   loaders: [
      //     'style-loader',
      //     {loader: 'css-loader', options: {importLoaders: 1}},
      //     'postcss-loader',
      //     'sass-loader',
      //   ],
      // }

      { test: /(\.css$)/,
        // exclude: /node_modules/,
        // include: __dirname,
        loaders: ['style-loader', 'css-loader', 'postcss-loader'] },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
      ,{ test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
    ]
  }
}
