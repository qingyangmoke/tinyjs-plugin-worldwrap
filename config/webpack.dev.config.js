const path = require('path');
const webpack = require('webpack');
const pkg = require('../package.json');

const banner = `Tiny.Weapon
Description:World Wrap Plugin
Author: ${pkg.author}
Version: v${pkg.version}
Github: ${pkg.repository.url}`;

const config = {
  entry: {
    'WorldWrap': [path.resolve(__dirname, '../src/index.js')]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: path.resolve(__dirname, '../dist'),
    filename: 'index.debug.js',
    libraryTarget: 'umd',
    library: ['Tiny', '[name]'],
  },
  plugins: [
    new webpack.BannerPlugin(banner),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
    ],
    // noParse: /src\/p2\/p2.js/
  },
};

module.exports = config;
