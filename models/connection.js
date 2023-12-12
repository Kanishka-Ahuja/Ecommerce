const mongoose = require('mongoose')
require('dotenv').config();

module.exports = async function init() {

  try {
    await mongoose.connect(process.env.DATABASE_PATH);
    console.log("Database Connected Successfully");
  }
  catch (error) {
    console.log("Error occured while connecting database :\n", error.message);
  }

}