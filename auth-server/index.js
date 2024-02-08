const https = require('https');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const expressApp = express();
const cookieParser = require("cookie-parser");
const configs = require('./config.js');

expressApp.use(cookieParser());
expressApp.use(cors(
  {
    credentials: true,
    origin: `https://${configs.CLIENT_HOST}:${configs.CLIENT_PORT}`,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
));
expressApp.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', `https://${configs.CLIENT_HOST}:${configs.CLIENT_PORT}`);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
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
  console.log(`Server listens https://${configs.HOST}:${configs.PORT}`);
}

https.createServer(httpsOptions, expressApp).listen(
  configs.PORT,
  configs.HOST,
  createServerCallback
);

const urlencodedParser = bodyParser.json(); // bodyParser.urlencoded({ extended: false (false) })

expressApp.get('/auth/refreshToken', (request, response) => {
  //const cookies = JSON.parse(request.headers?.cookie);
  const refreshToken = request.cookies.refresh_token;
  response.json({refreshToken});
});

expressApp.post("/auth/refreshToken", urlencodedParser, function (request, response) {

  if (!request.body) {
    return response.sendStatus(400);
  }

  const expireDate = new Date(Date.now() + (1000 * 60 * 60 * 24 * 365));
  response.header(
    'Set-Cookie', `refresh_token=${request.body.refreshToken}; Max-Age=${expireDate}; Domain=${configs.CLIENT_HOST}; Path=/; Expires=${expireDate}; HttpOnly; Secure; SameSite=None`,
  );

  response.json({success: 'ok'});
});