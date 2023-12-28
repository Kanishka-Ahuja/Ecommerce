const express = require('express');
const session = require('express-session');
const path = require('path');
const connectDatabase = require('./models/connection.js');

const admin_routes = require('./routes/admin.js');
const cart_routes = require('./routes/cart.js');
const product_routes = require('./routes/product.js');
const user_routes = require('./routes/user.js');
const favorite_routes = require('./routes/favorite.js')

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('views'));
app.use(express.static('uploads'));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Database connection
connectDatabase();

// Session setup
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  login: false,
  loaded: false,
  name: '',
  load: 5,
  Email: 'abc@gmail.com',
}));

// Routes
app.use('/cart', cart_routes);
app.use('/admin', admin_routes);
app.use('/product', product_routes);
app.use('/user', user_routes);
app.use('/favorite',favorite_routes)

// Default route
app.get('/', (req, res) => {
  res.redirect('/user/login');
});

app.get('/notfounderror', (req, res) => {
  res.render('error/notfound.ejs');
});

app.get('/accessdenied',(req,res)=>{
  res.render('error/notfound.ejs');
});

app.get('/servererror', (req, res) => {
  res.render('error/internal.ejs');
});

app.use((req, res,next ) => {
  res.status(404).render('error/notfound.ejs');
});

app.use((req, res) => {
  res.render('error/notfound.ejs');
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
