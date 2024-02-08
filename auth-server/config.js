console.log(process.env.NODE_ENV);

const config = {
  PORT: 7000,
  HOST: 'cp.passmen.ae',
  CLIENT_HOST: 'cp.passmen.ae',
  CLIENT_PORT: process.env.NODE_ENV === 'production' ? 443 : 5000,
};

module.exports = config;