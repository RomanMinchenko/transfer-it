const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackMerge = require("webpack-merge");

module.exports = {
  devServer: {
    port: 3004,
    host: '0.0.0.0',
    useLocalIp: true,
  },
  resolve: {
    alias: {
      assets: `${__dirname}/assets/`,
      ts: `${__dirname}/ts/`
    },
    mainFields: ['main'],
    extensions: ['.js', '.ts']
  },
  entry: {
    code: ['./ts/main.ts'],
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './html/index.html',
      title: 'Oddbods 2'
    }),
    new CleanWebpackPlugin(),
  ]
};
