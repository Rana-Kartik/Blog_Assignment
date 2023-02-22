const userModel = require('../models/user')
const userBlog = require('../models/addBlog')

//create the method for check the credentials
exports.login = (req, res) => {

    userModel.findOne().then(data => {
        const username = req.body.Username
        const password = req.body.Password
        console.log(data)
        //res.render('Adminindex')
        if (data.Username === username && data.Password === password) {
            res.render('Adminindex')
        }
        else {
            res.status(200).json({
                message: 'invalid username and password'
            })
        }
    })
}
exports.userdata = (req, res) => {
    userBlog.find()
        .select()
        .exec()
        .then(docs => {
            res.render('user', { docs: docs })
        })
}
exports.useredit = (req, res, next) => {
    const uid = req.params.uid
    console.log(uid)
    userBlog.findById(uid)
        .select('Title Category Description PublishDate')
        .exec()
        .then(result => {
            console.log(result);
            res.render('userdata', { result: result })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.search = (req, res, next) => {
    const searchTitle = req.body.title
    console.log(searchTitle)
    userBlog.find()
        .select()
        .where({ Title: searchTitle })
        .exec()
        .then(result => {
            const temp = result.pop()
            //console.log(temp)
            res.render('search', { result: temp })
        })
}