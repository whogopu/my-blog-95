var mongoose = require('mongoose');
import queryBuilder from '../helpers/query-builder';

const postSchema = mongoose.Schema({
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
    async create({title, body, publishDate, createdBy}) {
        try {
            let user = {
                title,
                body,
                publishDate,
                createdBy
            };

            const newPost = new this(newPost);
            return await newPost.save();
        } catch(e) {
            return Promise.reject(e);
        }
    },

};

postSchema.index({ username: 1}, { unique: true });

const UserAction = mongoose.model('UserAction', postSchema);

export default UserAction;