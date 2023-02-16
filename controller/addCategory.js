
const AddCategory = require('../models/addCategory')
const mongoose = require('mongoose')
const { json } = require('body-parser')

//creating the method of add category data in database
exports.add = (req, res) => {
    console.log(req.body)
    const addcategory = new AddCategory({
        _id: new mongoose.Types.ObjectId(),
        CategoryName: req.body.CategoryName,
    })
    addcategory.save()
        .then(result => {
            console.log(result)
            res.render('addCategory')
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}

//creating the method of fetching all the data 
exports.all = (req, res, next) => {
    AddCategory.find()
        .select('CategoryName  _id')
        .exec()
        .then(docs => {
            //    res.status(200).json({
            //        count : docs.length,
            //        blogs : docs.map(doc => {
            //            return {
            //                _id : doc._id,
            //                Name : doc.Name,
            //                Title : doc.Title,
            //                Category : doc.Category,
            //                Description: doc.Description,
            //                PublishDate: doc.PublishDate,
            //                Image : doc.Image
            //            }

            //         })
            //     })
            res.render('allCategory', { docs: docs })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

//creating the method of delete the data
exports.del = (req, res) => {
    const categoryid = req.params.cid
    AddCategory.deleteOne({ _id: categoryid })
        .then(
            console.log('category deleted')
        )
}