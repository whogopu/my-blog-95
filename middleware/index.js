const expressJwt = require('express-jwt');
const _ = require('lodash');
const config = require('../config/config');

const excludeUrls = [
	{
			url: '/users/signin',
			method: 'POST',
		}
];

const isLoggedIn = (req, res, next) => {
  if (_.find(excludeUrls, { url: req.path, method: req.method })) {
		return next();
	}
	const jwtMiddleWare = expressJwt({ secret: config.jsonSecret });
	return jwtMiddleWare(req, res, next);
};

const middlewares = {
  isLoggedIn
};

module.exports = middlewares;
