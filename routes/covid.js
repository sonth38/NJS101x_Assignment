const express = require('express')
const router = express.Router()

const covidController = require('../controller/covidController')

router.get('/', covidController.getIndex)
router.post('/temperature', covidController.postTemperature)
router.post('/injection', covidController.postInjection)
router.post('/infect', covidController.postInfect)

module.exports = router