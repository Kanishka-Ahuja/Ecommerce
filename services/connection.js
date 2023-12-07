const mailjet = require('node-mailjet')
require('dotenv').config();

module.exports =  async function connectEmail(){

    try{

        return await mailjet.apiConnect(
            process.env.MAILJET_API_KEY,
            process.env.MAILJET_SECRET_KEY
        );

    }
    catch(error){

        console.log("Error connecting mailjet : ",error.message);

    }
}