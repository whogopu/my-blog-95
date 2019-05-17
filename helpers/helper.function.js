var request = require('request');

const getGoogleUser = (accessToken) => {
  return new Promise((resolve, reject) => {
    request(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, function(err, response, body) {
      if(err) reject(err);
      resolve(JSON.parse(body));
    });
  });
};

const responseHandler = (success, data) => {
  return ({
    success,
    data
  });
};

const helperFunction = {
  responseHandler,
  getGoogleUser,
};

module.exports = helperFunction;
