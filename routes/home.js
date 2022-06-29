const express = require('express')
const router = express.Router()

const homeController = require('../controller/homeController')

const isAuth = require('../middleware/is-Auth')

router.get('/',isAuth , homeController.getIndex)

module.exports = router