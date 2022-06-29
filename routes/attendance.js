const express = require('express')
const router = express.Router()

const attendanceController = require('../controller/attendanceController')

const isAuth = require('../middleware/is-Auth')

// Check-in
router.get('/check-in',isAuth, attendanceController.getCheckin)
router.post('/check-in/start',isAuth, attendanceController.postCheckin)
router.get('/check-in/infor',isAuth, attendanceController.getCheckinInfor)

// Check-out
router.post('/check-out',isAuth, attendanceController.postCheckout)
router.get('/check-out/infor',isAuth, attendanceController.getCheckoutInfo)

// Leave -- Nghỉ phép
router.get('/leave',isAuth, attendanceController.getLeave)
router.post('/leave',isAuth, attendanceController.postLeave)
router.get('/leaveInfo',isAuth, attendanceController.getLeaveInfo)


module.exports = router