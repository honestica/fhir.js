var webpack = require("webpack");
var path = require("path");

module.exports = {
  entry: {
    fhir: ["./src/fhir.js"],
  },
  node: {
    buffer: "mock"
  },
  module: {
    loaders: [{ test: /\.coffee$/, loader: "coffee-loader" }]
  },
  externals: {"jquery": "jQuery"},
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".coffee", ".less"]
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    library: "fhir",
    libraryTarget: "umd"
  }
};
