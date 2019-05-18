var express = require('express');
var postValidation = require('../validations/post.validation')
var postController = require('../controllers/post.controller')
var validate = require('express-validation');
var middleware = require('../middleware')
var post = express.Router();

post.get('/', validate(postValidation.list), postController.list);

post.get('/:id', postController.get);

post.post('/', validate(postValidation.create), middleware.isLoggedIn, postController.create);

post.put('/:id', validate(postValidation.update), middleware.isLoggedIn, postController.update);

post.delete('/:id', middleware.isLoggedIn, postController.remove);

module.exports = post;
