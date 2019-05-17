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
      url: 'mongodb+srv://trackier_user:trackier_user@trackier-uiz2v.mongodb.net/test?retryWrites=true'
    }
  };
}

const configHolder = config;

module.exports = configHolder;
