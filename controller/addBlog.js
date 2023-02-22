const AddBlog = require('../models/addBlog')
const AddBlogs = require('../models/addBlog')
const mongoose = require('mongoose');
const { default: slugify } = require('slugify');
const { $where } = require('../models/addBlog');
const cloudinary = require('cloudinary').v2

//upload the image in the cloudinary
cloudinary.config({
    cloud_name: 'drwgcsxii',
    api_key: '228384945176164',
    api_secret: 'mwc99tncI24OoVV2elz1lrt_HWg',
    secure: true
});

//creating the method of add the blog data
exports.create = (req, res) => {
    console.log(req.body)
    const file = req.files.Image
    cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
        console.log(result)
        const addblog = new AddBlog({
            _id: new mongoose.Types.ObjectId(),
            Name: req.body.Name,
            Title: req.body.Title,
            Slug: slugify(req.body.Title, '-'),
            Category: req.body.Category,
            Description: req.body.Description,
            PublishDate: req.body.PublishDate,
            Image: result.url
        })
        addblog.save()
            .then(result => {
                console.log(result)
                res.render('addBlog')
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    error: err
                })
            })
    })
}

//creating the method of fetching data 
exports.allBlog = (req, res, next) => {
    AddBlog.find()
        .select()
        .exec()
        .then(docs => {
            console.log(docs);
            res.render('allBlog', { docs: docs })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

//creating the method of delete the data
exports.del = async (req, res) => {
    try {
        await AddBlog.deleteOne({ _id: req.body.id })
        res.status(200).send({ success: true, msg: 'post deleted successfully' })
    }
    catch (error) {
        res.status(400).send({ success: false, msg: error.message })
    }

}

//creating the method of update the data
exports.edit = async (req, res) => {

    try {
        var postData = await AddBlog.findOne({ _id: req.params.eid })
        res.render('editBlog', { post: postData })
    }
    catch (error) {
        console.log(error.message)
    }

}


exports.editblog = async (req, res) => {
    try {
        await AddBlog.findByIdAndUpdate({ _id: req.body.eid }, {
            $set: {
                Name: req.body.Name,
                Title: req.body.Title,
                Category: req.body.Category,
                Description: req.body.Description,
            }
        })
        res.status(200).send({ success: true, msg: 'post updated successfully' })
    }
    catch (error) {
        res.status(400).send({ success: false, msg: error.message })
    }

}