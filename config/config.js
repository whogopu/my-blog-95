const env = 'dev';
let config;

if (env === 'dev') {
  config = {
    mongodb: {
      url: 'mongodb://localhost:27017/trackier'
    }
  };
}

if (env === 'prod') {
  config = {
    mongodb: {
      url: 'mongodb://localhost:27017/trackier'
    }
  };
}

const configHolder = config;

module.exports = configHolder;
