const userdata = require('../../models/user.js')
const cart = require('../../models/cart.js')
const sendemail = require('../../services/email/verifyEmail.js')
const sendemail2 = require('../../services/email/passwordUpdate.js')

const login = async (req, res) => {
  let email = req.body.Email
  let Password = req.body.Password
  userdata.findOne({ Email: email, Password: Password }, function (err, data) {
    if (data != null) {
      verified = data.verified
      req.session.name = data.Name;
      req.session.Email = data.Email
      if (verified) {
        req.session.login = true;
        res.redirect('/product/home')
      }
      else {
        res.redirect('/user/verifyemail')
      }
    }
    else {
      res.render("login.ejs", { Error: "Invalid Credentials" })
    }
  })
}

const signUp = async (req, res) => {
  let email = req.body.Email
  userdata.find({ Email: email }, function (err, data) {
    if (data.length == 0) {
      req.session.user = req.body
      req.session.user.verified = false
      function between(min, max) {
        return Math.floor(
          Math.random() * (max - min) + min
        )
      }
      let otp = between(100000, 999999)
      req.session.user.OTP = otp
      const user = new userdata()
      user.Name = req.body.Name
      user.Email = req.body.Email
      user.Password = req.body.Password
      user.verified = false
      user.OTP = otp
      user.save()
      const cartdata = new cart()
      cartdata.User = req.body.Email;
      cartdata.product = [];
      cartdata.save()
      req.session.Email = req.body.Email;
      sendemail(req.session.user.Email, req.session.user.Name, otp, function (err, data) {
        res.redirect('/user/verifyemail')
      })
    }
    else {
      res.render('signup.ejs', { Error: "Account already Exits" })
    }
  })
}

const verifyEmail = async (req, res) => {
  let email = req.body.Email
  let Password = req.body.Password
  let OTP = req.body.OTP
  userdata.findOne({ Email: email, Password: Password, OTP: OTP }, function (err, data) {
    if (data === null) {
      res.render("./verify/index.ejs", { Error: "Invalid Credentials" });
    }
    else {
      userdata.findOneAndUpdate({ Email: email, Password: Password, OTP: OTP }, { verified: true }, function (err, data) {
        res.redirect('/user/login')
      })
    }
  })
}

const changePassword = async(req,res)=>{
  let email = req.body.Email
  userdata.findOne({Email:email},function(err,data){
    if(req.body.CPassword===req.body.NPassword)
    {
      let Password = req.body.CPassword

       userdata.findOneAndUpdate({Email:email},{Password:Password},function(err,data){
        
        sendemail2(req.body.Email,data.Name,function(){
        res.redirect('/user/logout')
        })
      })
    }
    else
    {
      res.render('pswd.ejs',{Error :"Passwords do not match !!"})
    }
  })
}
module.exports = { login, signUp, verifyEmail ,changePassword};