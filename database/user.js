const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const SchemaStruct = new Schema({
    Name: String,
    Email: String,
    Password:String,
    verified:Boolean,
    OTP:Number
  });

const mymodel = mongoose.model('userdata', SchemaStruct)
module.exports = mymodel