import path from 'path';
import webpack from 'webpack';
import Dotenv from 'dotenv-webpack';

export default {
  devtool: 'inline-source-map',
  entry: [
    path.resolve(__dirname, 'client/index')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new Dotenv({ systemvars: true }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/, loaders: ['style-loader', 'css-loader']
      }
    ]
  }
};
