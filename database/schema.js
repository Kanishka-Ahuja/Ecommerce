const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const SchemaStruct = new Schema({
    Title:  String,
    Category: String,
    Description: String,
    Price:String,
    Url:String
  });

const mymodel = mongoose.model('product', SchemaStruct)
module.exports = mymodel