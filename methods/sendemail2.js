/**
 *
 * Run:
 *
 */
 const mailjet = require('node-mailjet').apiConnect(
    "d047bbae3db5de916567965760cefd6e",
    "7d4d3d5c5c4fd68cd5f33d4c2f54529d"
  )


  module.exports = function(email,name,callback){

      const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
              Email: 'kanishkahuja.2874@gmail.com',
              Name: 'MusicalEra',
            },
            To: [
              {
                Email: email,
                Name: name,
              },
            ],
            Subject: 'Verify your account !!',
            TextPart: "Hey, Your Password is changed successfully." 
            ,
          },
        ],
      })
      request
        .then(result => {
          console.log(result.body)
          callback(null,result.body)
        })
        .catch(err => {
          console.log(err)
          callback(err,null)
        })

  }