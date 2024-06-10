const express = require('express')
const registerUser = require('../Controller/registerUSer')
const checkEmail = require('../Controller/checkEmail')
const checkPassword = require('../Controller/checkPassword')
const userDetails = require('../Controller/userDetail')
const logout = require('../Controller/logout')
const updateUserDetails = require('../Controller/updateUser')

const router = express.Router()

router.post('/register', registerUser).post('/email', checkEmail).post('/password', checkPassword)

//login user detail3
router.post('/user-details', userDetails)
//login user detail3
router.get('/logout', logout)

//update user
router.patch('/update-user' ,updateUserDetails)

module.exports = router