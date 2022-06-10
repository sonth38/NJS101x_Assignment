const path = require('path')
const rootDir = require('../util/path')

const express = require('express')

const router = express.Router()

const checkInCheckOut = require('../controller/checkInCheckOut')

router.get('/', checkInCheckOut.getIndex)


module.exports = router