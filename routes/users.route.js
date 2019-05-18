var express = require('express');
var userValidation = require('../validations/user.validation')
var userController = require('../controllers/user.controller')
var validate = require('express-validation');

var user = express.Router();

user.post('/signin', validate(userValidation.create), userController.signin );

module.exports = user;
