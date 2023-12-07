const connection = require('./connection.js')
require('dotenv').config()

module.exports = async function (email, name, otp, callback) {

  try {

    const mailjet = await connection()
    const response = await mailjet.post('send', { version: 'v3.1' }).request({

      Messages: [
        {
          From: {
            Email: process.env.EMAIL_ADDRESS,
            Name: process.env.SITE_NAME,
          },

          To: [
            {
              Email: email,
              Name: name,
            },
          ],

          Subject: 'Verify Your Account !!!',

          TextPart: "Hi " + name + ", You are one step away to start your journey with MusicalEra. Here's your OTP : "+ otp ,

        },
      ],

    })

    callback(null,response)

  }
  catch(error){

    console.log("Error connecting mailjet : ",error.message);
    callback(error,null)

  }
}
  