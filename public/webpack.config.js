'use strict';

let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

require("dotenv").config();

module.exports = {
  entry: {
    bundle: "./public/app/quizzy.js"
  },
  output: {
    path: __dirname + '/build',
    publicPath: '/build/',
    filename: '[name].js',
    library: '[name]'
  },
  watch: process.env.IS_DEV,
  watchOptions: {
    aggregateTimeout: 100
  },
  module: {
    loaders: [
      { test: /\.(ttf|eot|woff|woff2|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file?name=[path][name].[ext]" },
      { test: /\.html$/, loader: 'raw' },
      {
        test: /\.js?$/,
        include: __dirname + (process.env.WINDOWS ? '\\app' : '/app'),
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          cacheDirectory: true,
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-2']
        }
      },
      {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader!resolve-url!sass-loader?sourceMap')
      },
      {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  plugins: [
        new ExtractTextPlugin('styles.css', {
            allChunks: true
        })
    ]
};
