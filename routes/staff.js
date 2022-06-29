const express = require('express')
const router = express.Router()

const staffController = require('../controller/staffController')

const isAuth = require('../middleware/is-Auth')

router.get('/',isAuth, staffController.getIndex)
router.post('/',isAuth, staffController.postStaffUpdate)
router.get('/information',isAuth, staffController.getStaffInfo)

module.exports = router