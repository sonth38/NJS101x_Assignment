const express = require('express')
const router = express.Router()

const covidController = require('../controller/covidController')

const isAuth = require('../middleware/is-Auth')

router.get('/',isAuth, covidController.getIndex)
router.post('/temperature',isAuth, covidController.postTemperature)
router.post('/injection',isAuth, covidController.postInjection)
router.post('/infect',isAuth, covidController.postInfect)

module.exports = router