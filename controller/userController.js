const userModel = require('../models/user')
const userBlog = require('../models/addBlog')

//create the method for check the credentials
exports.login = (req, res) => {

    userModel.findOne().then(data => {
        const username = req.body.Username
        const password = req.body.Password
        console.log(data)
        //res.render('Adminindex')
        if(data.Username === username && data.Password === password)
        {
           res.render('Adminindex')
        }
        else
        {
            userBlog.find()
            .select()
            .exec()
            .then(docs => {
                  res.render('user',{docs:docs})
            })
           // res.render('user')
        }
    })
}
exports.useredit = (req, res, next) => {
    const uid = req.params.uid
    console.log(uid)
    userBlog.findById(uid)
        .select('Title Category Description PublishDate' )
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

exports.search = async(req,res,next) => {
    const searchTitle = req.query.title
    console.log(searchTitle)
     let data = await userBlog.find({
        "$or":[
            {title:{$regex:searchTitle}}
        ]
     })
     console.log(data)
     //await userBlog.find({where : {title :searchTitle}})
    //  .select('Name')
    //  .exec()
    //  .then(result => {
    //     console.log(result)
    //  })
    //  .catch(err => {
    //     res.status(500).json({
    //         error : err
    //     })
    //  })
}