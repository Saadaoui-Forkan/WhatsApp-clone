const { User } = require('../models/userModel')
const bcrypt = require('bcryptjs')
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

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = new User({
            name,
            username,
            password: hashedPassword
        });
        await user.save();

        res.send(user.signJwt());
        
    } catch (err) {
        console.log(err)
        res.status(500).send("Server error");    
    }
}

const loginUser = async(req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const { name, password } = req.body
    try {
        let user = await User.findOne({ name })
        if(!user) {
            return res.status(400).json({ message: "الرجاء التحقق من إسم المستخدم و كلمة المرور"})
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "الرجاء التحقق من إسم المستخدم و كلمة المرور" });
        }

        // Generate Token
        const token = user.signJwt()

        res.status(200).send({
            _id: user._id,
            name: user.name,
            token
        })


    } catch (error) {
        console.log(error)
        res.status(500).send("Server error");  
    }
}

module.exports = {
    registerUser,
    loginUser
}