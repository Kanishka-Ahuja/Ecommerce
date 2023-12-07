const connection = require('./connection.js')
require('dotenv').config()

module.exports = async function (email, name, callback) {

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

          Subject: 'Password Changed Successfully!!!',

          TextPart: "Hi "+ name +", Your account password has been updated recently.",

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
  