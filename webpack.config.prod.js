const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname, 'js'),
      ],
      use: {
        loader: 'babel-loader',
        options: {
          presets: [['@babel/preset-env', {
            forceAllTransforms: true,
            useBuiltIns: 'usage',
            modules: "commonjs",
            corejs: { version: 3 },
            targets: {
              "ie": "10"
            },
          }]],
          plugins: ["@babel/plugin-transform-arrow-functions"]
        },
      },
    },
    {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    }],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'textures', to: 'textures' },
        { from: 'audio', to: 'audio' },
        { from: 'images', to: 'images' },
        { from: 'spines', to: 'spines' },
        { from: 'locales', to: 'locales' },
        { from: 'fonts', to: 'fonts' },
      ],
    }),
  ]
});