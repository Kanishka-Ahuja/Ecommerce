const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  Name: String,
  Email: String,
  Password: String,
  verified: Boolean,
  OTP: Number
});

const model = mongoose.model('user', UserSchema)
module.exports = model