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
        test: /\.ts$/, // Расширение файлов, которые должны быть обработаны Babel
        exclude: /node_modules/, // Исключите папку node_modules
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/, // Обрабатываем PNG, SVG и другие изображения
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]", // Имя и расширение остаются неизменными
              outputPath: "./src", // Каталог, в который будут помещены изображения
            },
          },
        ],
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
