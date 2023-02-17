const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()
const AddBlog = require('../models/addBlog')
const blogController = require('../controller/addBlog')

//set the route and call the controller method
router.post('/addBlog', blogController.create)
router.get('/allBlog', blogController.allBlog)
router.get('/delete/:bid', blogController.del)
router.get('/edit/:eid', blogController.edit)
router.post('/edit/:blogid', blogController.editblog)


module.exports = router