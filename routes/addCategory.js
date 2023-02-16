const express = require('express')

const categoryRouter = express.Router()
const categoryModel = require('../models/addCategory')
const categoryController = require('../controller/addCategory')

categoryRouter.post('/ca', categoryController.add)
categoryRouter.get('/allcategory' , categoryController.all)


module.exports = categoryRouter