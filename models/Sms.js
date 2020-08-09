const mongoose = require('mongoose');

const SmsSchema = new mongoose.Schema({
  ToCountry: String,
  ToState: String,
  SmsMessageSid: String,
  NumMedia: String,
  ToCity: String,
  FromZip: String,
  SmsSid: String,
  FromState: String,
  SmsStatus: String,
  FromCity: String,
  Body: String,
  FromCountry: String,
  To: String,
  ToZip: String,
  NumSegments: String,
  MessageSid: String,
  AccountSid: String,
  From: String,
  ApiVersion: String
})



module.exports = mongoose.model('Sms', SmsSchema)