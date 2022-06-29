const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)

const router = require('./routes/index');

const Staff = require('./models/staff')

const app = express()
// Cấu hình store lưu trữ session
const store = new MongoDBStore({
    uri:'mongodb+srv://root:8888@cluster0.yub1b.mongodb.net/staffs',
    collection: 'session'
})

//  Parse body
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// add template engine EJS
app.set('view engine', 'ejs')
app.set('views', 'views')

// Đặt static đến folder public
app.use(express.static(path.join(__dirname, 'public')))

// Cấu hình session
app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false, store: store }))

app.use((req, res, next) => {
    if (!req.session.staff) {
        return next()
    }
    Staff.findById(req.session.staff._id)
    .then(staff => {
      req.staff = staff;
      next()
    })
    .catch(error => {
      console.log(error);
    });
})

// Init router
router(app);

//Điều hướng đến trang lỗi 404
app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found', path: ''})
})

// Kết nối đến database
mongoose.connect('mongodb+srv://root:8888@cluster0.yub1b.mongodb.net/staffs?retryWrites=true&w=majority')
    .then(result => {
        app.listen(3000)
        console.log('Database connected!')
    })
    .catch(err => {
        throw err
    })
