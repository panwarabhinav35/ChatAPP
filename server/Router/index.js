const express = require('express')
const registerUser = require('../Controller/registerUSer')
const checkEmail = require('../Controller/checkEmail')
const checkPassword = require('../Controller/checkPassword')
const userDetails = require('../Controller/userDetail')
const logout = require('../Controller/logout')
const updateUserDetails = require('../Controller/updateUser')
const searchUser = require('../Controller/searchUser')
const getMessages = require('../Controller/Messages')

const router = express.Router()

router.post('/register', registerUser).post('/email', checkEmail).post('/password', checkPassword)

//login user detail3
router.post('/user-details', userDetails)
//login user detail3
router.get('/logout', logout)

//update user
router.patch('/update-user' ,updateUserDetails)

//search user
router.post('/search',searchUser)

//All Messages
router.post('/messages',getMessages)

module.exports = router