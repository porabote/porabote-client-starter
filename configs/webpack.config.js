const configs = require('./configs');

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = (webpackEnv) => {
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";

  return {
    mode: isEnvProduction ? "production" : isEnvDevelopment && "development",
    bail: isEnvProduction,
    context: path.join(__dirname, "../"),
    stats: "errors-warnings",
    entry: {
      main: "./src/index.js",
    },
    output: {
      path: (isEnvProduction) ? path.join(__dirname, "../build") : path.join(__dirname, "../dist"),
      filename: "[name].[fullhash].bundle.js",
      publicPath: (isEnvProduction) ? "/porabote" : "/",
    },
    resolve: {
      extensions: [".js", ".ts", ".jsx", ".tsx", ".ttf"],
      alias: {
        "@app": path.resolve(__dirname, "../src/app"),
        "@": path.resolve(__dirname, "../src/"),
        "@plugins": path.resolve(__dirname, "../src/plugins/"),
        "@src": path.resolve(__dirname, "../src/"),
        "@components": path.resolve(__dirname, "../src/components/"),
        "@hocs": path.resolve(__dirname, "../src/hocs/"),
        "@store": path.resolve(__dirname, "../src/store"),
        "@api": path.resolve(__dirname, "../src/api-services/"),
        "@configs": path.resolve(__dirname, "../src/configs/"),
        "@styles": path.resolve(__dirname, "../src/styles/"),
      },
    },
    snapshot: {
      managedPaths: [
        path.resolve(__dirname, "../node_modules/porabote"),
      ]
    },
    module: {
      rules: [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          exclude: /(node_modules\/[^porabote]|bower_components)/,
          include: [
            // path.resolve(__dirname, "../node_modules/porabote"),
            path.resolve(__dirname, "../src"),
          ],
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-typescript"],
                ["@babel/preset-env",
                  {
                    targets: {
                      esmodules: true,
                    },
                  }],
                "@babel/preset-react",
              ],
            },
          },
        },
        {
          test: /\.(less|css)$/,
          use: [
            {
              loader: "style-loader", // creates style nodes from JS strings
            }, {
              loader: "css-loader", // translates CSS into CommonJS
            }, {
              loader: "less-loader", // compiles Less to CSS
            },
          ],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          loader: "file-loader",
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: "asset/inline",
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.BASENAME": JSON.stringify(process.env.DOMAIN),
        "process.env.API_URL": JSON.stringify(process.env.API_URL),
        "process.env.AUTH_URL": JSON.stringify(process.env.AUTH_URL),
      }),
      new HtmlWebpackPlugin({
        title: "webpack Boilerplate",
        template: path.resolve(__dirname, "../public/index.html"),
        filename: "index.html",
      }),
      // применять изменения только при горячей перезагрузке
      new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].[fullhash].bundle.css",
      }),
      new CleanWebpackPlugin({}),
      new ESLintPlugin({
        exclude: ["node_modules"],
      }),
    ],
    devServer: {
      client: {
        overlay: false,
      },
      historyApiFallback: true,
      static: path.resolve(__dirname, "../dist"),
      open: true,
      compress: true,
      hot: isEnvDevelopment,
      allowedHosts: [
        configs.domain,
      ],
      host: configs.domain,
     // server: 'https',
      server: {
        // 'https': {
        //   cert: configs.certPath,
        //   key: configs.certKey,
        // }
      },
      // cert: configs.certPath,
      // key: configs.certKey,
      // writeToDisk: false,
      onListening: (server) => {
        const {port} = server.server.address();
        console.log("Listening on port:", port);
      },
      proxy: {
        "/userfiles/files": `https://${configs.domain}`,
      },
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      //   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      //   'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      // },
    },
  };
};
