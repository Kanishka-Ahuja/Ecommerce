const userdata = require('../../../database/user.js')
const cart = require('../../../database/cart.js')
const sendemail = require('../../email/verifyEmail.js')

const login = async(req,res)=>{
  let email = req.body.Email
  let Password = req.body.Password
  userdata.findOne({Email: email,Password:Password},function(err,data){
    if(data!=null)
    {
    verified = data.verified
    req.session.name = data.Name;
    req.session.Email = data.Email
    if(verified)
    {
      req.session.login = true;
      res.redirect('/product/home') 
    }
    else
    {
      res.redirect('/user/verifyemail') 
    }
  }
  else
    {
      res.render("./login/index.ejs",{Error: "Invalid Credentials"})
    }
  })
}

const signUp = async(req,res)=>{
    let email = req.body.Email
  userdata.find({Email:email},function(err,data){
    if(data.length==0)
    {
      req.session.user = req.body 
      req.session.user.verified = false
      function between(min, max) {  
        return Math.floor(
          Math.random() * (max - min) + min
        )
      }
      let otp = between(100000,999999)
      req.session.user.OTP = otp
      const user = new userdata()
      user.Name = req.body.Name
      user.Email = req.body.Email
      user.Password = req.body.Password
      user.verified = false
      user.OTP = otp
      user.save()
      const cartdata = new cart()
      cartdata.User= req.body.Email;
      cartdata.product=[];
           cartdata.save()
      req.session.Email = req.body.Email;
        sendemail(req.session.user.Email,req.session.user.Name,otp,function(err,data){
          res.redirect('/user/verifyemail')
        })
    }
    else
    {
      res.render('./signup/index.ejs',{Error :"Invalid Credentials"})
    }
  })  
}

const verifyEmail = async(req,res)=>{
    let email = req.body.Email
    let Password = req.body.Password
    let OTP = req.body.OTP
    userdata.findOne({Email:email,Password:Password,OTP:OTP},function(err,data){
      if(data===null)
      {
        res.render("./verify/index.ejs",{Error : "Invalid Credentials"});
      }
      else
      {
        userdata.findOneAndUpdate({Email:email,Password:Password,OTP:OTP},{verified:true},function(err,data){
          res.redirect('/user/login') 
        })
      }
    })
}

module.exports = {login,signUp,verifyEmail};