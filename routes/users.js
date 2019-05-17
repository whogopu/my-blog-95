var express = require('express');
var userValidation = require('../validations/user.validation')
var userController = require('../controllers/user.controller')
var validate = require('express-validation');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a users');
});

router.post('/signin', validate(userValidation.create), userController.signin );

module.exports = router;
