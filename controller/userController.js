const userModel = require('../models/user')

exports.login = (req, res) => {

    userModel.findOne().then(data => {
        const username = req.body.Username
        const password = req.body.Password
        console.log(data)
        res.render('Adminindex')
        // if(data.Username === username && data.Password === password)
        // {
        //    res.render('Adminindex')
        // }
        // else
        // {
        //     console.log('welcome user')
        //     //res.render('allBlog')
        // }
    })


}