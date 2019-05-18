var sid = require('shortid');
var helperFunction = require('../helpers/helper.function')
var Posts = require('../models/post.model');
let S = require('string');

const list = async (req, res, next) => {
  try {
    let { skip = 0, limit = 10 } = req.query;
    let foundPosts = await Posts.list({ skip, limit });

    res.json(helperFunction.responseHandler(true, { posts: foundPosts }));
  } catch (error) {
    next(error)
  }
};

const get = async (req, res, next) => {
  try {
    let { id } = req.params;
    let foundPost = await Posts.findOne({ _id: id });

    res.json(helperFunction.responseHandler(true, { post: foundPost }));
  } catch (error) {
    next(error)
  }
};

const create = async (req, res, next) => {
  try {
    let { title, body } = req.body;
    let { user } = req;

    let tempName = S(S(S(title.toLowerCase()).replaceAll('"', '').s).strip('\'', '‘', '’', '/', '?', '|', '@', ':', '"', '$', '#', '%', '^', ',', '%', '&', '!', '*', '(', ')', '.', '+', '`').s).dasherize().s;
    let _id = `${tempName}-${sid.generate()}`
    let createdPost = await Posts.create({_id, title, body, publishDate: Date.now(), createdBy: user.author.username});
    res.json(helperFunction.responseHandler(true, {post: createdPost}));

  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    let { title, body } = req.body;
    let { user } = req;
    let { id } = req.params;


    let foundPost = await Posts.findOne({_id: id});

    if(!foundPost) return res.status(404).json(helperFunction.responseHandler(false, {message: 'Post not found'}));

    if(foundPost.createdBy !== user.author.username) return res.status(401).json(helperFunction.responseHandler(false, {message: 'Not Authorized'}));

    let updatedPost = await Posts.findOneAndUpdate({_id: id}, {$set: {title, body}}, {new: true})

    res.json(helperFunction.responseHandler(true, {post: updatedPost}));

  } catch (error) {
    next(error)
  }
}


const remove = async (req, res, next) => {
  try {
    let { user } = req;
    let { id } = req.params;

    let foundPost = await Posts.findOne({_id: id});

    if(!foundPost) return res.status(404).json(helperFunction.responseHandler(false, {message: 'Post not found'}));

    if(foundPost.createdBy !== user.author.username) return res.status(401).json(helperFunction.responseHandler(false, {message: 'Not Authorized'}));

    await Posts.findOneAndRemove({_id: id})

    res.json(helperFunction.responseHandler(true));

  } catch (error) {
    next(error)
  }
}

const userHelperFunctions = {
  list,
  get,
  create,
  update,
  remove
};

module.exports = userHelperFunctions;
