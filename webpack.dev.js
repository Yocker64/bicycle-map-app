// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
    map: './src/scripts/map.js',
    register: './src/scripts/register.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: 'eval-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    watchFiles: ['./src/template.html', './src/*.html'],
    allowedHosts: 'all',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: 'index.html',
      chunks: ['main'],
    }),

    new HtmlWebpackPlugin({
      template: './src/map.html',
      filename: 'map.html',
      chunks: ['map'],
    }),
    new HtmlWebpackPlugin({
      template: './src/register.html',
      filename: 'register.html',
      chunks: ['register'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        type: 'javascript/auto',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
