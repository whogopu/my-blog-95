var mongoose = require('mongoose');
var queryBuilder = require('../helpers/query-builder');

const postSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        unique: true
    },
    body: {
        type: String
    },
    publishDate: {
        type: Number,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

postSchema.statics = {
    async create({_id, title, body, publishDate, createdBy}) {
        try {
            let newPost = {
                _id,
                title,
                body,
                publishDate,
                createdBy
            };

            const createdPost = new this(newPost);
            return await createdPost.save();
        } catch(e) {
            return Promise.reject(e);
        }
    },
    async list({ skip, limit }) {
        try {
            const listPostsQuery = [
                {$sort: {
                    publishDate: -1
                }},
                {$skip: skip},
                {$limit: limit}
            ]
            const foundPosts = await  this.aggregate(listPostsQuery)
            return foundPosts;
        } catch (error) {
            return Promise.reject(error)
        }
    }

};

postSchema.index({ username: 1}, { unique: true });

const UserAction = mongoose.model('post', postSchema);

module.exports = UserAction;