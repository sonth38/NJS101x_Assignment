const express = require('express')
const router = express.Router()

const attendanceController = require('../controller/attendanceController')

// Check-in
router.get('/check-in', attendanceController.getCheckin)
router.post('/check-in/start', attendanceController.postCheckin)
router.get('/check-in/infor', attendanceController.getCheckinInfor)

// Check-out
router.post('/check-out', attendanceController.postCheckout)
router.get('/check-out/infor', attendanceController.getCheckoutInfo)

// Leave -- Nghỉ phép
router.get('/leave', attendanceController.getLeave)
router.post('/leave', attendanceController.postLeave)
router.get('/leaveInfo', attendanceController.getLeaveInfo)


module.exports = router