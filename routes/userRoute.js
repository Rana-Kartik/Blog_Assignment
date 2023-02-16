const express = require('express')

const userRouter = express.Router()
const userModel = require('../models/user')
const userController = require('../controller/userController')

userRouter.post('/l', userController.login)


module.exports = userRouter