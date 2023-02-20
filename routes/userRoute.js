const express = require('express')
const userRouter = express.Router()
const userModel = require('../models/user')
const userController = require('../controller/userController')

//set the route and call the controller method
userRouter.post('/l', userController.login)
userRouter.get('/useredit/:uid' , userController.useredit)
userRouter.get('/search' , userController.search)

module.exports = userRouter