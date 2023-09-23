const mongoose = require('mongoose');

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

const User = mongoose.model('User', UserSchema)
module.exports = {
    User,
}