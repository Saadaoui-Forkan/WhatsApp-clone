const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: 20
    },
    password: {
        type: String,
        required: true
    },
    about: {
        type: String,
        maxlength: 100
    },
    avatar: String,
})

const Model = mongoose.model('User', ModelSchema);
module.exports = Model;