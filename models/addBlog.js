const { default: mongoose } = require('mongoose')
//const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    Name: {
         type: String, require: true
    },
    Title: {
        type: String, require: true
    },
    Category: {
        type: String, require : true
    },
    Description: {
        type : String, require : true
    },
    PublishDate : {
        type: String , require: true
    },
    Image : {
        type: String, require: true
    }
})

module.exports = mongoose.model('BlogAdd', blogSchema)