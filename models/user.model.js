var mongoose = require('mongoose');
var queryBuilder = require('../helpers/query-builder');

mongoose.set('useCreateIndex', true);

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    joinedSince: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

userSchema.statics = {
    async create({username, email}) {
        try {
            let user = {
                username,
                email
            };

            const newUser = new this(user);
            return await newUser.save();
        } catch(e) {
            return Promise.reject(e);
        }
    },

};

userSchema.index({ username: 1}, { unique: true });

const UserAction = mongoose.model('UserAction', userSchema);

module.exports = UserAction;