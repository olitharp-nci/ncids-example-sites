const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [
                  path.join(
                      __dirname,
                      './node_modules/@nciocpl/ncids-css/packages'
                  ),
                  path.join(
                      __dirname,
                      './node_modules/@nciocpl/ncids-css/uswds-packages'
                  ),
                ],
              },
              sourceMap: true,
            },
          },
        ]
      },
    ]
  }
};

module.exports = config;
