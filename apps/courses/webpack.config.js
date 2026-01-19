import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

const { ModuleFederationPlugin } = webpack.container;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    port: 3001,
    historyApiFallback: true,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  output: {
    publicPath: "auto",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [tailwindcss("./tailwind.config.js"), autoprefixer],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "courses",
      filename: "remoteEntry.js",
      exposes: {
        "./CoursesApp": "./src/App.jsx",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: "18.2.0",
          eager: false,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "18.2.0",
          eager: false,
        },
        "@reduxjs/toolkit": {
          singleton: true,
          eager: false,
        },
        "react-redux": {
          singleton: true,
          eager: false,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
