const express = require('express');
const { userRegister, userLogin, getUserById, userUpdate} = require('../../controllers/userController')
const verifyToken = require('../../verifyToken')

const router = express.Router();

//@desc Get a user by token from db
//@route GET /api/user/
//@access w/Token
router.get('/', verifyToken, getUserById);

//@desc Register a new user to db
//@route POST /api/user/register
//@access Public
router.post('/register', userRegister);

//@desc Login a user from db
//@route POST /api/user/login
//@access Public
router.post('/login', userLogin);

//@desc Update a user in db
//@route PUT /api/user/update
//@access w/Token
router.put('/update', verifyToken, userUpdate);

module.exports = router;
