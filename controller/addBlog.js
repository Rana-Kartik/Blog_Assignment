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
            Slug:slugify(req.body.Title, '-'),
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
exports.del = (req, res) => {
    const blogid = req.params.bid
    AddBlog.deleteOne({ _id: blogid })
        .then(
            res.send("alert('are you sure')")
        )
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: 'blog is not deleted'
            })
        })
}

//creating the method of update the data
exports.edit = (req, res) => {
    const editid = req.params.eid

    AddBlogs.findById({_id : editid})
        .then((Course) => {
            const viewsData = {
                edit: true,
                Course,
                pageTitle: 'Edit Course'
            }
            res.render('editBlog', viewsData)
        }).catch((error) => {
            console.log(error)
            res.status(500).json({
                message: 'post is not Edited'
            })
        })
}


exports.editblog = (req,res) =>{
    const id = { eid: req.params.blogid };
    const update = { Name: req.body.Name,
                     Title : req.body.Title,
                     Category : req.body.Category,
                     Description: req.body.Description,
                };
    console.log(update)
    AddBlog.findOneAndUpdate(id, update)
    .then(
       res.status(200).json({
        message:'blog updated'
       })
    )
    .catch(err => {
        console.log(err)
    })
}