const express = require('express')
const connectDatabase = require('./database/init.js')
const product = require('./database/product.js')
const userdata = require('./database/user.js')
const session = require('express-session')
const app = express()
const sendemail2 = require('./services/email/passwordUpdate.js')
const cart_routes = require('./services/routes/cart.js')
const admin_routes = require('./services/routes/admin.js')
const product_routes = require('./services/routes/product.js')
const user_routes = require('./services/routes/user.js')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('admin'))
app.use(express.static('public'))
app.use(express.static('uploads'))
app.set('view engine','ejs')
const path = require('path')
app.set('views',path.join(__dirname, "public"))
connectDatabase()
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
 
app.use('/cart',cart_routes)
app.use('/foradmin',admin_routes)
app.use('/product',product_routes)
app.use('/user',user_routes)

app.get('/', (req, res) => {
 res.redirect('/user/login')
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
        res.redirect('/user/logout')
        })
      })
    }
    else
    {
      res.render('./pswd/index.ejs',{Error :"Passwords do not match !!"})
    }
  })
})


app.get('/getfile',(req,res)=>{
  product.find({},function(err,data){
    res.send(data)
  })
})



app.listen(process.env.PORT, () => {
	console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})
