const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.js",
    main: "./src/pages/main/main.js",
    about: "./src/pages/about/about.js",
    benefits: "./src/pages/benefits/benefits.js",
    cars: "./src/pages/cars/cars.js",
    contact: "./src/pages/contact/contact.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./build"),
    publicPath: "/",
    assetModuleFilename: "assets/[name].[contenthash][ext]",
  },
  mode: "development",
  devtool: "source-map",
  devServer: {
    open: "main.html",
    hot: true,
    port: 4444,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|mp4|webm|ogg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.hbs$/,
        use: [
          {
            loader: "handlebars-loader",
            options: {
              // ваши опции, если есть
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new HtmlWebpackPlugin({
      title: "main",
      filename: "main.html",
      template: "./src/pages/main/main.html",
      chunks: ["main"],
    }),
    new HtmlWebpackPlugin({
      title: "about",
      filename: "about.html",
      template: "./src/pages/about/about.html",
      chunks: ["about"],
    }),
    new HtmlWebpackPlugin({
      title: "benefits",
      filename: "benefits.html",
      template: "./src/pages/benefits/benefits.html",
      chunks: ["benefits"],
    }),
    new HtmlWebpackPlugin({
      title: "cars",
      filename: "cars.html",
      template: "./src/pages/cars/cars.html",
      chunks: ["cars"],
    }),
    new HtmlWebpackPlugin({
      title: "contact",
      filename: "contact.html",
      template: "./src/pages/contact/contact.html",
      chunks: ["contact"],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, "src/assets/image"), to: "images" },
        { from: path.resolve(__dirname, "src/assets/video"), to: "videos" },
      ],
    }),
  ],
  performance: {
    hints: false,
    maxAssetSize: 512000,
    maxEntrypointSize: 512000,
  },
};
