const { User } = require('../models/userModel')
const {  validationResult } = require('express-validator')

const registerUser = async(req,res) => {

    // validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    
    const { name, username, password } = req.body

    try {
        let user = await User.findOne({ name });
        if (user) {
            return res.status(400).json({ message: "User Already Exist" });
        }

        user = new User({
            name,
            username,
            password
        });
        await user.save();

        res.send(user.signJwt());
        
    } catch (err) {
        console.log(err)
        res.status(500).send("Server error");    
    }
}

module.exports = {
    registerUser,
}