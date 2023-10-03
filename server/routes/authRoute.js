const router = require('express').Router()
const multer = require("multer"); 
const {
  registerUser,
  loginUser,
  getCurrentUser,
  getUsers,
  changePassword,
  updateProfile,
} = require("../controllers/authCtr");
const { check } = require('express-validator');
const protect = require('../middlewares/authMiddleware');
const path = require('path')

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

// /api/auth/currentUser
router.get('/currentUser', protect, getCurrentUser)

//  /api/auth/allusers/:userId
router.get('/allusers/:id', getUsers)

// /api/auth/change_password
router.post(
  "/change_password",
  [
    check("newPassword",'Please enter a password with 6 or more characters').isLength({min: 6}),
  ],
  protect,
  changePassword
);

//  /api/auth/profile
const storage = multer.diskStorage({
  destination: function (req,file,cb){
      cb(null,path.join(__dirname,"../uploads"));
  },
  filename: function (req,file,cb){
      cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  }
});

const upload = multer({ storage: storage });
router.post('/profile', [upload.single("image"), protect], updateProfile)

module.exports = router;