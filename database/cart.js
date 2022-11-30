const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const SchemaStruct = new Schema({
    User:String,
    product:[]
  });

const mymodel = mongoose.model('cart', SchemaStruct)
module.exports = mymodel