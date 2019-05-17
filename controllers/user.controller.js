var request = require('request');
var jwt = require('jsonwebtoken');
var sid = require('shortid');
var helperFunction = require('../helpers/helper.function')
var Users = require('../models/user.model');
var configHolder = require('../config/config')

const signin = async (req, res, next) => {
  try {
    let { accessToken } = req.body;

    let userData = await helperFunction.getGoogleUser(accessToken);
    if(!userData) return res.status(401).json(helperFunction.responseHandler(false, {message: 'Signin Error!!!'}))

    let { email, picture, name } = userData;
    let emailSlug = email.split('@')[0];
    let username =`${emailSlug}-${sid.generate()}`

    let signedInUser = await Users.create({ email, username, picture, name })

    const tokenData = {
      email: signedInUser.email,
      username: signedInUser.username,
      picture: signedInUser.picture,
      name: signedInUser.name
    };

    const token = jwt.sign({ author: tokenData }, configHolder.jsonSecret);

    res.json(helperFunction.responseHandler(true, { token }));
  } catch (error) {
    next(error)
  }
};

const userHelperFunctions = {
  signin
};


module.exports = userHelperFunctions;
