const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('./webpack.config');

module.exports = env =>
  merge(config(env), {
    // ローカルサーバの設定
    devServer: {
      contentBase: './build',
      hot: true,
      inline: true,
      historyApiFallback: true
    },
    // ソースマップの設定
    devtool: 'inline-source-map',
    plugins: [
      // hotモードに必要なプラグイン
      new webpack.HotModuleReplacementPlugin()
    ]
  });
