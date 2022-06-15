const attendanceRouter = require('./attendance')
const homeRouter = require('./home')
const staffRouter = require('./staff')
const covidRouter = require('./covid')

function router(app) {
    app.use('/attendance', attendanceRouter)
    app.use('/staff', staffRouter)
    app.use('/covid', covidRouter)
    app.use('/', homeRouter)
}

module.exports = router