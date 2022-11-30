const express = require('express')
const initdb = require('./database/init.js')
const schema = require('./database/schema.js')
const cart = require('./database/cart.js')
const userdata = require('./database/user.js')
const session = require('express-session')
const ejs = require('ejs')
const fs = require('fs')
const app = express()
const  multer= require('multer')
const port = 2875
const upload = multer({ dest: 'uploads/' })
const sendemail = require('./methods/sendemail.js')
const sendemail2 = require('./methods/sendemail2.js')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('admin'))
app.use(express.static('uploads'))
app.use(express.static('public'))
app.set('view engine','ejs')
app.set('views',__dirname+"/public")
//app.set('view engine','ejs')



initdb()
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  login: false,
  loaded:false,
  name : '',
  load: 5,
  Email:'abc@gmail.com',
}))


app.get('/', (req, res) => {
 res.redirect('/login')
})

app.post('/addproduct',upload.single('ProductImage'),(req,res)=>{
  let { Title, Category, Description, Price, p } = req.body;
  const product = new schema()
  product.Title= Title;
  product.Category=Category;
  product.Description=Description;
  product.Price=Price;
  product.Url=req.file.filename;
  product.save()
  res.redirect('/318k2i21d7t25788978')
})

app.route('/changeP').get((req,res)=>{
  res.render('./pswd/index.ejs',{Error :""})
})
.post((req,res)=>{
  let email = req.body.Email
  userdata.findOne({Email:email},function(err,data){
    if(req.body.CPassword===req.body.NPassword)
    {
      let Password = req.body.CPassword
       userdata.findOneAndUpdate({Email:email},{Password:Password},function(err,data){
        sendemail2(req.body.Email,req.body.Name,function(){
        res.redirect('/logout')
        })
      })
    }
    else
    {
      res.render('./pswd/index.ejs',{Error :"Passwords do not match !!"})
    }
  })
})

app.route('/login').get((req,res)=>{
  if(!req.session.login)
  {
	  res.render('./login/index.ejs',{Error :""})
  }
  else
  {
    res.redirect('/showproduct')
  }
})
.post((req,res)=>{

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
      res.redirect('/showproduct') 
    }
    else
    {
      res.redirect('/verifyemail') 
    }
  }
  else
    {
      res.render("./login/index.ejs",{Error: "Invalid Credentials"})
    }
  })
})

app.get('/getfile',(req,res)=>{
  schema.find({},function(err,data){
    res.send(data)
  })
})

app.get('/getcartdata',(req,res)=>{

  let email = req.session.Email
  cart.findOne({User:email},function(err,data){
    let info = data.product
    let temp = []
    for(let j=0;j<info.length;j++)
    {
      temp[j] = info[j].Url
    }
    res.send(temp)
  })
})
app.route('/showproduct').get((req,res)=>{
  if(req.session.login)
  {
    req.session.load =5
    schema.find({}, function(err,data){
      let temp = data.splice(0, 5);
      res.render("./home/index.ejs",{name : req.session.name,data:temp});   
    })
}
else
{
  res.redirect('/login')
}
})

app.route('/decrement').post((req,res)=>{
  let id = req.body.id
  let email = req.session.Email
  cart.findOne({User:email},function(err,data){
    let info = data.product
    for(let j=0;j<info.length;j++)
    {
      if(info[j].Url==id)
      {
        temp = info[j].Qty
        if(temp!=1)
        {
          temp = temp-1;
        }
        info[j].Qty = temp
      }
    }
    cart.findOneAndUpdate({User:email},{product:info},function(err,data){
      res.json(temp)
    })
  })
})
app.route('/increment').post((req,res)=>{
  let id = req.body.id
  let email = req.session.Email
  cart.findOne({User:email},function(err,data){
    let info = data.product
    for(let j=0;j<info.length;j++)
    {
      if(info[j].Url==id)
      {
        temp = info[j].Qty
        temp = temp+1;
        info[j].Qty = temp
      }
    }
    cart.findOneAndUpdate({User:email},{product:info},function(err,data){
      res.json(temp)
    })
  })
})

app.route('/loadmore').get((req,res)=>{
  if(req.session.login)
  {
    schema.find({},function(err,data){

      let load = 5;
      let start = req.session.load;
      let end = req.session.load + load;
      req.session.load = end
      let temp = []
      temp = data.splice(start,load)
      if(temp.length===0)
      {
        res.end()
      }
      else
      {
      res.json(temp);
      }
    })
}
else
{
  res.redirect('/login')
}
})

app.route('/addtocart').get((req,res)=>{
  let email = req.session.Email
  cart.findOne({User:email},function(err,data){
    let info = data.product
    res.render("./home/viewcart.ejs",{data: info,name: req.session.name}) 
  })
})
.post((req,res)=>{
  let id = req.body.id
  schema.findOne({Url:id},function(err,data){
  const info = {}
  info.Url = data.Url
  info.Title = data.Title
  info.Price = data.Price
  info.Qty = 1
  let email = req.session.Email
  cart.findOne({User: email},function(err,data){
  let data1 = data.product
  data1.push(info)
  cart.findOneAndUpdate({User: email},{product:data1},function(err,data){
    res.send({redirectTo : '/addtocart'})
  })
  })
})
})

app.route('/removefromcart').post((req,res)=>{
  let id = req.body.id
  schema.findOne({Url:id},function(err,data){
    let email = req.session.Email
    cart.findOne({User:email},function(err,data){
      let data1 = data.product
      let j = data1.filter(function(obj)
      {
        return obj.Url!==id;
      })
      cart.findOneAndUpdate({User: email},{product:j},function(err,data){
        res.send({redirectTo : '/addtocart'})
      })
    })
  })
})

app.route('/signup').get((req,res)=>{
  if(!req.session.login)
  {
    res.render('./signup/index.ejs',{Error :""})
  }
})
.post((req,res)=>{
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
          res.redirect('/verifyemail')
        })
    }
    else
    {
      res.render('./signup/index.ejs',{Error :"Invalid Credentials"})
    }
  })  
})

app.route('/verifyemail').get((req,res)=>{

  res.render("./verify/index.ejs",{Error : ""});
})
.post((req,res)=>{

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
        res.redirect('/login') 
      })
    }
  })
})

app.route('/318k2i21d7t25788978').get((req,res)=>{

    res.sendFile(__dirname+'/admin/admin.html')
})

app.route('/logout').get((req,res)=>{
  req.session.destroy();
	res.redirect('/')
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
