const express = require('express')
const router = express.Router()

const staffController = require('../controller/staffController')

router.get('/', staffController.getIndex)
router.post('/', staffController.postStaffUpdate)
router.get('/information', staffController.getStaffInfo)

module.exports = router