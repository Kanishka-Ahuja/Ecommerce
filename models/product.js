const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  Title: String,
  Category: String,
  Description: String,
  Price: String,
  Url: String
});

const model = mongoose.model('product', ProductSchema)
module.exports = model