const path = require('path');
const ClosureCompilerPlugin = require('../../src/closure-compiler-plugin');

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
    devtool: 'source-map',
    optimization: {
      minimize: isProduction,
      minimizer: [
        new ClosureCompilerPlugin({
          mode: 'STANDARD', // a little misleading -- the actual compilation level is below
          test: /app.*/
        }, {
          languageOut: 'ECMASCRIPT5',
          compilation_level: 'ADVANCED'
        }),
      ],
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
      },
      concatenateModules: false,
    },
    plugins: [
    ]
  };
};
