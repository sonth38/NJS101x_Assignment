const express = require('express')
const router = express.Router()

const salaryController = require('../controller/salaryController')

router.get('/', salaryController.getIndex)
router.post('/', salaryController.postSalary)
// router.get('/information', staffController.getStaffInfo)

module.exports = router