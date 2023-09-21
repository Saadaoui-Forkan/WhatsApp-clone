const router = require('express').Router()
const { registerUser, loginUser, getCurrentUser, getUsers } = require('../controllers/authCtr')
const { check } = require('express-validator');
const protect = require('../middlewares/authMiddleware');

// /api/auth/register
router.post("/register", [
    check('name', 'Name is required with less than 20 characters').not().isEmpty().isLength({max: 20}),
    check('username', 'Name is required with less than 20 characters').not().isEmpty().isLength({max: 20}),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6}),
], registerUser);

// /api/auth/login
router.post("/login", [
    check('name', 'Name is required with less than 20 characters').not().isEmpty().isLength({max: 20}),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6}),
], loginUser);

// /api/auth
router.get('/', protect, getCurrentUser)

//  /api/auth/allusers/:userId
router.get('/allusers/:id', getUsers)

module.exports = router;