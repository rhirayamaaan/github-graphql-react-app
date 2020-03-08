// const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const path = require('path');

// console.log('REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN', process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN);

const createStyleLoaders = isProduction => [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      sourceMap: !isProduction,
      modules: true
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: [require('autoprefixer'), require('postcss-clean')]
    }
  }
];

module.exports = env => ({
  mode: 'production',
  entry: ['./src/App.tsx'],
  output: {
    publicPath: '/',
    path: `${__dirname}/build/`,
    filename: 'bundle.js'
  },
  resolve: {
    // importする拡張子の指定
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css']
  },
  // loaderの設定
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(graphql|gql)$/,
        loader: 'graphql-tag/loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: createStyleLoaders(env.production)
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          ...createStyleLoaders(env.production),
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !env.production
            }
          }
        ]
      }
    ]
  },
  plugins: [new Dotenv()]
});
