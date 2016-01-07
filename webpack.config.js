var webpack = require('webpack');

module.exports = {
  target: 'node',
  entry: './index.js',
  output: {
    library: "swapiLambda",
    libraryTarget: "commonjs2",
    filename: "swapiLambda.js"
  },
  module: {
    exprContextRegExp: /$^/,
    exprContextCritical: false,
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0']
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};
