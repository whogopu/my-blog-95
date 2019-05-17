var mongoose = require('mongoose');

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
    name: {
        type: String
    },
    picture: {
        type: String
    },
    joinedSince: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

userSchema.statics = {
    async create({username, email, name, picture}) {
        try {
            let foundUser = await this.findOneAndUpdate({email}, {$set: {name, picture}}, {new: true});

            if(foundUser) return foundUser;

            foundUser = new this({username, email, name, picture, joinedSince: Date.now()})
            return await foundUser.save();
        } catch(e) {
            return Promise.reject(e);
        }
    },

};

userSchema.index({ username: 1}, { unique: true });

const UserAction = mongoose.model('user', userSchema);

module.exports = UserAction;