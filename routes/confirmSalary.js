const express = require('express')
const router = express.Router()
const confirmController = require('../controller/confirmSalary')
const isAuth = require('../middleware/is-Auth')

router.get('/', isAuth, confirmController.getIndex)
router.post('/', isAuth, confirmController.postStaff)

router.post('/postDeleteWorkTime', isAuth, confirmController.postDeleteWorkTime);


module.exports = router