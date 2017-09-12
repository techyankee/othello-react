const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3000,
    inline: true
  },
  module: {
      loaders: [
         {
            test: /.js?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
               presets: ['babel-preset-es2015', 'react']
            }
         },
         {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader'],
         },
      ]
   }
};
