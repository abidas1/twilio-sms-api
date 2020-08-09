const Sms = require('../models/Sms');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async')



// send sms
// Post /api/v1/twillio/sms/send
exports.sendSms = asyncHandler(async (req, res, next) => {
    
    const accountSid = process.env.TWILIO_ACCOUNT_SID; 
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({
            to: req.body.twilioTo,
            from: process.env.TWILIO_PHONE_NUMBER,
            body: req.body.messageBody
        })
        .then(message => res.status(200).json(message))
        .catch(err => console.log(err));
  })

// get sms
// Post /api/v1/twillio/sms/get
exports.getSms = asyncHandler(async (req, res, next) => {
    const messages = await Sms.find();
    return res.status(200).json({
      success: true,
      data: messages
    });
})
