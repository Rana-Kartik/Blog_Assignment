const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()
const AddBlog = require('../models/addBlog')
const blogController = require('../controller/addBlog')

router.post('/addBlog', blogController.create)
router.get('/allBlog' ,blogController.allBlog )
    

module.exports = router