const attendanceRouter = require('./attendance')
const homeRouter = require('./home')
const staffRouter = require('./staff')
const salaryRouter = require('./salary')
const covidRouter = require('./covid')

function router(app) {
    app.use('/attendance', attendanceRouter)
    app.use('/staff', staffRouter)
    app.use('/salary', salaryRouter)
    app.use('/covid', covidRouter)
    app.use('/', homeRouter)
}

module.exports = router