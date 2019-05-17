var request = require('request');
var jwt = require('jsonwebtoken');
var sid = require('shortid');
var helperFunction = require('../helpers/helper.function')
var Users = require('../models/user.model');

const signin = async (req, res, next) => {
  try {
    let { accessToken } = req.body;

    let userData = await helperFunction.getGoogleUser(accessToken);
    if(!userData) return res.status(401).json(helperFunction.responseHandler(false, {message: 'Signin Error!!!'}))

    let {email, picture, name} = userData;
    let emailSlug = email.split('@')[0];
    let username =`${emailSlug}-${sid.generate()}`

    let signedInUser = await Users.create({email, username, picture, name})
    res.json(helperFunction.responseHandler(true, {user: signedInUser}));
  } catch (error) {
    next(error)
  }
};

const userHelperFunctions = {
  signin
};


module.exports = userHelperFunctions;
