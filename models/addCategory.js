const { default: mongoose } = require('mongoose')

//create the category table
const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    CategoryName: {
        type: String, require: true
    },
})

module.exports = mongoose.model('Category', categorySchema)