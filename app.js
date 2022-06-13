const path = require('path')
const express = require('express')
const mongoose = require('mongoose')

const attendanceRouter = require('./routes/attendance')

const Staff = require('./models/staff')

const app = express()

// add template engine EJS
app.set('view engine', 'ejs')
app.set('views', 'views')

//  Parse body
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Đặt static đến folder public
app.use(express.static(path.join(__dirname, 'public')))

// Add staff in request
app.use((req, res, next) => {
    Staff.findOne({ _id: '62a6a6298d2f112f6b3956c3' })
        .then((staff) => {
            req.staff = staff;
            next();
        })
        .catch((error) => {
            console.log(error);
        });
});

// Điều hướng đến attendance
app.use(attendanceRouter)

// Điều hướng đến trang lỗi 404
app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found', path: ''})
})

// Kết nối đến database
mongoose.connect('mongodb+srv://root:8888@cluster0.yub1b.mongodb.net/staffs?retryWrites=true&w=majority').then(result => {
    app.listen(3000)
    console.log('Database connected!')
}).catch(err => {
    console.log(err)
})
