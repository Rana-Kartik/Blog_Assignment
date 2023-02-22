const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileupload = require('express-fileupload')
const blogRoutes = require('./routes/addBlog')
const userRoutes = require('./routes/userRoute')
const categoryRoutes = require('./routes/addCategory')


//Set the credentials of mongodb database
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://ranaka:eKc3b9iA4Iid0WiA7GxxigYK@15.206.7.200:28017/ranaka?authSource=admin&readPreference=primary&ssl=false')
    .then(() => {
        console.log('Database connection successfully')
    })
    .catch((err) => {
        console.log(err)
    })

//use the middlwere for image insert    
app.use(fileupload({
    useTempFiles: true
}))

//use the bodyparser for seding the data
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin , X-Reuested-With, Content-TypeError, Authorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

//set the view engine
app.set('view engine', 'ejs')
app.set('views', 'views');

//use the static files
app.use('/static', express.static(path.join(__dirname, 'public')))

//set the endpoint of page
app.use('/Blog', blogRoutes)
app.use('/login', userRoutes)
app.use('/category', categoryRoutes)

//use the external template 
app.use('/loginTemplate', express.static(path.join(__dirname, 'loginTemplate')));
app.use('/Admin', express.static(path.join(__dirname, 'Admin')));
app.use('/user', express.static(path.join(__dirname, 'user')));

//this app listening on port 1200
app.listen(1200, (req, res, next) => {
    console.log("server running on port 1200")
})

//get the index page from view
app.get('/', (req, res, next) => {
    res.render('index.ejs')
})

//get the category page from view
app.get('/category/ca', (req, res) => {
    res.render('addCategory')
})

app.get('/adminhome',(req,res) => {
    res.render('Adminindex')
})


//get the blog page from view
app.get('/Blog/addBlog', (req, res) => {
    res.render('addBlog')
})