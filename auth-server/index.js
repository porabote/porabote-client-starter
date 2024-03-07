const https = require('https');
const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const configs = require('./config.js');

const app = express();

const start = async () => {
  try {

    // app.set('port', configs.SERVER_PORT);
    // app.set('host', configs.SERVER_HOST);

    app.use(cookieParser());

    const originHost = configs.CLIENT_PORT ?
      `https://${configs.CLIENT_HOST}:${configs.CLIENT_PORT}` : `https://${configs.CLIENT_HOST}`;

    app.use(cors(
      {
        credentials: true,
        origin: originHost,
        methods: 'POST,GET,OPTIONS',
        // allowedHeaders: 'Content-Type,Content-Length,Origin, X-Requested-With, Content-Type, Accept,Authorization, Api-Version, X-CSRF-TOKEN',
        optionsSuccessStatus: 200, // для старых браузеров и SmartTV
      }
    ));

    app.use(function (req, res, next) {
      // res.header('Access-Control-Allow-Origin', `https://${configs.CLIENT_HOST}:${configs.CLIENT_PORT}`);
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Content-Type', 'application/json;charset=UTF-8');
      res.header(
        'Access-Control-Allow-Headers',
        'Content-Type,Content-Length,Origin, X-Requested-With, Content-Type, Accept,Authorization, Api-Version, X-CSRF-TOKEN'
      );
      next();
    });

    const httpsOptions = {
      key: fs.readFileSync(path.resolve(__dirname, '../.cert/key.key')),
      cert: fs.readFileSync(path.resolve(__dirname, '../.cert/cert.crt')),
    }

    const createServerCallback = () => {
      console.log(`Server listens https://${configs.SERVER_HOST}:${configs.SERVER_PORT}, Client: ${originHost}`);
    }

    https.createServer(httpsOptions, app).listen(
      configs.SERVER_PORT,
      configs.SERVER_HOST,
      createServerCallback
    );

    const urlencodedParser = bodyParser.json(); // bodyParser.urlencoded({ extended: false (false) })

    app.get('/auth/refreshToken', (request, response) => {

      const refreshToken = request.cookies.refresh_token;
      response.json({refreshToken, mode: configs.CLIENT_PORT, Client: originHost});

    });

    app.post("/auth/refreshToken", urlencodedParser, function (request, response) {

      if (!request.body) {
        return response.sendStatus(400);
      }

      const expireDate = new Date(Date.now() + (1000 * 60 * 60 * 24 * 365));
      response.header(
        'Set-Cookie', `refresh_token=${request.body.refreshToken}; Max-Age=${expireDate}; Domain=${configs.CLIENT_HOST}; Path=/; Expires=${expireDate}; HttpOnly; Secure; SameSite=None`,
      );

      response.json({success: 'ok'});
    });

  } catch (e) {
    console.log(e);
  }
}

start();