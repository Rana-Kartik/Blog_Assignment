const userModel = require('../models/user')

exports.login = (req, res) => {

    userModel.findOne().then(data => {
        const username = req.body.Username
        const password = req.body.Password
        console.log(data)
        if(data.Username === username && data.Password === password)
        {
           res.render('AdminIndex')
        }
        else
        {
            console.log('welcome user')
            //res.render('allBlog')
        }
    })


}