const mongoose = require('mongoose')
const Schema = mongoose.Schema

const favorites = new Schema({
    User : String,
    products : [],
})

const model = mongoose.model('favorite',favorites)
module.exports = model