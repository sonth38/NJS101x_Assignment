const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const mainRouter = require('./routes/main')

// connect database mongoose
const mongoose = require('mongoose')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(mainRouter)

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found', path: ''})
})

mongoose.connect('mongodb+srv://root:8888@cluster0.yub1b.mongodb.net/staffs?retryWrites=true&w=majority').then(result => {
    app.listen(3000)
    console.log('Database connected!')
}).catch(err => {
    console.log(err)
})
