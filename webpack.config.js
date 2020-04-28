module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    path: `${__dirname}/dist`,
    filename: "index.js",
    library: "Stats",
    libraryTarget: "umd",
    globalObject: "typeof self !== 'undefined' ? self : this", // https://github.com/webpack/webpack/issues/6522#issuecomment-371120689
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
