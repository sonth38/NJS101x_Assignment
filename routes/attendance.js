const express = require('express')
const router = express.Router()

const attendanceController = require('../controller/attendanceController')


router.get('/', attendanceController.getIndex)
router.get('/check-in', attendanceController.getCheckin)
router.post('/check-in/start', attendanceController.postCheckin)
router.get('/check-in/infor', attendanceController.getCheckinInfor)


module.exports = router