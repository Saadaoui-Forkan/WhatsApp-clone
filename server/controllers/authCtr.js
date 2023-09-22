const { User } = require('../models/User')
const bcrypt = require('bcryptjs')
const {  validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

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

        res.send(user);
        
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
        // console.log({user})
        if(!user) {
            return res.status(400).json({ message: "الرجاء التحقق من إسم المستخدم و كلمة المرور"})
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password)
        console.log(isMatch)
        if (!isMatch) {
            return res.status(400).json({ message: "الرجاء التحقق من إسم المستخدم و كلمة المرور" });
        }

        // Generate Token
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
            if (err) throw err
            res.json({
                success: true,
                data: {
                    id: user.id,
                    name: user.name,
                    token
                }
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).send("Server error");  
    }
}

// Get Me
const getCurrentUser = async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server error"); 
    }
}

// Get all users except the connected user
const getUsers = async(req,res) => {
    const userId = req.params.id
    try {
        const users = await User.find({ _id: { $ne: userId } }).select([
            "name",
            "username",
        ]);
        res.json(users);
    } catch (error) {
        console.log(error)
        res.status(500).send("Server error"); 
    }
}

module.exports = {
    registerUser,
    loginUser, 
    getCurrentUser,
    getUsers
}