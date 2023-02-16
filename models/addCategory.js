const { default: mongoose } = require('mongoose')
//const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    CategoryName: {
         type: String, require: true
    },
})

module.exports = mongoose.model('Category', categorySchema)