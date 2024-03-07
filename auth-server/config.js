console.log(process.env.NODE_ENV);

const config = {
  SERVER_HOST: 'cp.passmen.ae',
  CLIENT_HOST: 'cp.passmen.ae',
  SERVER_PORT: process.env.NODE_ENV === 'development' ? '8000' : '7000',
  CLIENT_PORT: process.env.NODE_ENV === 'development' ? '3000' : null,
};

module.exports = config;