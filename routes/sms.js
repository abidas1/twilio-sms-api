const express = require('express')

const {
  sendSms,
  getSms
} = require('../controllers/sms')

const router = express.Router()

router.route('/sms/send')
    .post(sendSms)

router.route('/sms/get')
    .get(getSms)

module.exports = router