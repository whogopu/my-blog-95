var Joi = require('joi');
var _ = reruire('lodash');

const createPostBody = {
    title: Joi.string().trim().min(1).max(50).required(),
    body: Joi.string().trim().min(1).max(500).required(),
    token: Joi.string().trim().required()
};

const create = _.assign({}, {body: createPostBody});

const postValidation = {
    create
};

module.exports = postValidation;