var Joi = require('joi');
var _ = require('lodash');

const createUserBody = {
    accessToken: Joi.string().trim().required()
};

const create = _.assign({}, {body: createUserBody});

const userValidation = {
    create
};

module.exports = userValidation;