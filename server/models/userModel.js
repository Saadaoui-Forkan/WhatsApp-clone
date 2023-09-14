const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const ModelSchema = new mongoose.Schema({
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
ModelSchema.methods.getData = function(){
    return {
        id: this._id,
        name: this.name,
        username: this.username,
        about: this.about,
        avatar: this.avatar
    };
};

// Generate User Tocken
ModelSchema.methods.signJwt = function(){
    let data = this.getData();
    data.token = jwt.sign(data, process.env.JWT_SECRET);
    return data;
};

const Model = mongoose.model('User', ModelSchema);
module.exports = Model;