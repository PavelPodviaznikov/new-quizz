

module.exports = {
  entry: "./public/app/quizzy.js",
  output: {
    path: __dirname + '/build',
    publicPath: '/build/',
    filename: 'bundle.js'
  },
  watch: false,
  watchOptions: {
    aggregateTimeout: 100
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.(ttf|eot|woff|woff2|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file?name=[path][name].[ext]" },
      { test: /\.html$/, loader: 'raw' },
      {
        test: /\.js?$/,
        include: __dirname + '\\app',
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          cacheDirectory: true,
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-2']
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  }
};
