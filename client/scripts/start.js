"use strict";

const Webpack = require("webpack");
const path = require('path');
const http = require('http');
const WebpackDevServer = require('webpack-dev-server');
const configs = require('../configs/configs');

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const configFactory = require('../configs/webpack.config.js');

const start = () => {

  const webpackConfig = configFactory('development');
  const compiler = Webpack(webpackConfig);

  return new Promise((resolve, reject) => {

    const PORT = process.env.PORT || configs.port_dev;
    const HOST = process.env.DOMAIN || configs.domain;

    const devServerOptions = Object.assign({}, webpackConfig.devServer, {
      open: true,
      host: HOST,
      port: PORT,
    });

    //WebpackDevServer.addDevServerEntrypoints(configFactory, devServerOptions);

    const devServer = new WebpackDevServer(devServerOptions, compiler)

    // devServer.start(PORT, HOST, (err) => {
    // });

    devServer.startCallback(() => {
      console.log(`Dev server listening on port ${HOST}:${PORT}`);
    });

    return resolve('Compiled successfully.');

  }).catch(err => {
    console.log(err);
  });
};

let startPromise = start();

const isStarted= (res) => {
  console.log(`Server is started`);
}

const isStartFailed= (res) => {
  console.log(`Server wasn\`t started!`);
}

startPromise.then(isStarted, isStartFailed);