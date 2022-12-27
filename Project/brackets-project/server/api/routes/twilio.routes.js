const express = require('express')
const router = express.Router()

const TwilioController = require('../controllers/twilio.controller')

router.post('/sms-callback', TwilioController.smsCallback)

module.exports = router
