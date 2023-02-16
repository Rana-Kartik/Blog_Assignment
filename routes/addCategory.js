const express = require('express')

const categoryRouter = express.Router()
const categoryModel = require('../models/addCategory')
const categoryController = require('../controller/addCategory')

//set the route and call the controller method
categoryRouter.post('/ca', categoryController.add)
categoryRouter.get('/allcategory', categoryController.all)
categoryRouter.get('/delete/:cid', categoryController.del)


module.exports = categoryRouter