const userModel = require('../models/user')

//create the method for check the credentials
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