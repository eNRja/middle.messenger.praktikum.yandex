const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  resolve: {
    alias: {
      handlebars: "handlebars/dist/handlebars.min.js",
    },
    extensions: [".ts", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|svg|gif)$/,
        type: "asset/resource",
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader",
      },
      {
        test: /\.ts?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "tsconfig.json"),
            },
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.pcss$/,
        use: [
          "style-loader",
          "css-loader",
          { loader: "postcss-loader", options: { sourceMap: true } },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./static/index.html",
    }),
  ],
};
