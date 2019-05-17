var request = require('request');
var jwt = require('jsonwebtoken');
var Users = require('../models/user.model');

const getGoogleUser = (accessToken) => {
  return new Promise((resolve, reject) => {
    request(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, function(err, response, body) {
      if(err) reject(err);
      resolve(JSON.parse(body));
    });
  });
};

const signin = async (req, res, next) => {
  try {
    let { accessToken } = req.boyd;

    // let userData = await getGoogleUser(accessToken);
    console.log(accessToken);
    res.json('done');
  } catch (error) {
    next(error)
  }
};

const userHelperFunctions = {
  signin
};


module.exports = userHelperFunctions;
