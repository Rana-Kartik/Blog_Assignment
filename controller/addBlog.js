const AddBlog = require('../models/addBlog')
const mongoose = require('mongoose')
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: 'drwgcsxii', 
    api_key: '228384945176164', 
    api_secret: 'mwc99tncI24OoVV2elz1lrt_HWg',
    secure: true
  });
  

exports.create = (req,res) => {
    console.log(req.body)
    const file = req.files.Image
    cloudinary.uploader.upload(file.tempFilePath, (err,result) => {
        console.log(result)
        const addblog = new AddBlog({
            _id: new mongoose.Types.ObjectId(),
            Name : req.body.Name,
            Title : req.body.Title,
            Category : req.body.Category,
            Description : req.body.Description,
            PublishDate : req.body.PublishDate,
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
                error:err
            })
        })
    })
}

exports.allBlog = ('/',(req,res,next) => {
    AddBlog.find()
    .select('Name Title Category Description PublishDate _id')
    .exec()
    .then(docs => {
       res.status(200).json({
           count : docs.length,
           blogs : docs.map(doc => {
               return {
                   _id : doc._id,
                   Name : doc.Name,
                   Title : doc.Title,
                   Category : doc.Category,
                   Description: doc.Description,
                   PublishDate: doc.PublishDate
               }
           })
       })
    })
    .catch(err => {
       res.status(500).json({
           error: err
       })
    })
})