const path = require('path');
const ClosureCompilerPlugin = require('../../src/closure-compiler-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production' || !argv.mode;

  return {
    entry: {
      app: './src/app.js',
    },
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: isProduction ? '[name].[chunkhash:8].js' : '[name].js?[chunkhash:8]',
      chunkFilename: isProduction ? '[name].[chunkhash:8].js' : '[name].js?[chunkhash:8]',
    },
    devServer: {
      open: true,
      contentBase: path.resolve(__dirname, 'public'),
      inline: !isProduction
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: 'head',
      }),
    ],
    devtool: 'source-map',
    optimization: {
      minimize: isProduction,
      minimizer: [
        new ClosureCompilerPlugin({ mode: 'AGGRESSIVE_BUNDLE' }, {dependency_mode: 'PRUNE'})
      ],
      splitChunks: {
        minSize: 0,
        chunks: 'all',
        maxInitialRequests: Infinity
      },
      concatenateModules: false,
    }
  };
};
