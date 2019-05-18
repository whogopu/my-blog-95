var Joi = require('joi');
var _ = require('lodash');

const createPostBody = {
    title: Joi.string().trim().min(1).max(50).required(),
    body: Joi.string().trim().min(1).max(500).required()
};

const listPostQuery = {
    limit: Joi.number().min(1).max(20),
    skip: Joi.number().min(0)
};

const create = _.assign({}, {body: createPostBody});
const list = _.assign({}, {query: listPostQuery});
const update = _.assign({}, { body: createPostBody });

const postValidation = {
    create,
    list,
    update
};

module.exports = postValidation;