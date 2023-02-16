const { default: mongoose } = require('mongoose')

//create the Login table
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Username: {
        type: String, require: true
    },
    Password: {
        type: String, require: true
    },
})

module.exports = mongoose.model('Login', userSchema)