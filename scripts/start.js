'use strict';
const configs = require('../configs/configs');

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const path = require('path');
const http = require('http');

const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const configFactory = require('../configs/webpack.config.js');

const start = () => {

  const webpackConfig = configFactory('development');
  const compiler = webpack(webpackConfig);

  return new Promise((resolve, reject) => {

    const PORT = process.env.PORT || configs.port_dev;
    const HOST = process.env.DOMAIN || configs.domain;

    const devServerOptions = Object.assign({}, webpackConfig.devServer, {
      open: true,
    });

    webpackDevServer.addDevServerEntrypoints(configFactory, devServerOptions);

    const devServer = new webpackDevServer(compiler, devServerOptions)

    devServer.listen(PORT, HOST, err => {
      console.log(`Dev server listening on port ${HOST}`);
      if (err) {
         console.log(err);
      }
    });

    return resolve('Compiled successfully.');

  }).catch(err => {
    console.log(err);
  })
}

let startPromise = start();

const isStarted= (res) => {
  console.log(`Server is started`);
}

const isStartFailed= (res) => {
  console.log(`Server wasn\`t started!`);
}

startPromise.then(isStarted, isStartFailed);