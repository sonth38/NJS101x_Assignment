const express = require('express')
const router = express.Router()

const salaryController = require('../controller/salaryController')

const isAuth = require('../middleware/is-Auth')

router.get('/',isAuth, salaryController.getIndex)
router.post('/',isAuth, salaryController.postSalary)
// router.get('/information', staffController.getStaffInfo)

module.exports = router