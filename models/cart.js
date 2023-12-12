const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    User:String,
    product:[]
  });

const model = mongoose.model('cart', CartSchema)
module.exports = model