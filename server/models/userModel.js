const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: 20
    },
    username: {
        type: String,
        required: true,
        maxlength: 20
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    about: {
        type: String,
        maxlength: 100
    },
    avatar: String,
})

// Get User Profile Data
UserSchema.methods.getData = function(){
    return {
        id: this._id,
        name: this.name,
        username: this.username,
        about: this.about,
        avatar: this.avatar
    };
};

// Generate User Token
UserSchema.methods.signJwt = function(){
    let data = this.getData();
    data.token = jwt.sign(data, process.env.JWT_SECRET);
    return data;
};

const User = mongoose.model('User', UserSchema)
module.exports = {
    User,
}