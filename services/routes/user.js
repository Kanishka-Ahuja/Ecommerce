const express = require('express')
const router = express.Router()

const {loginPage,signupPage,verificationPage,logout} = require('../controllers/usercontrollers/getroutes.js')

const {login,signUp,verifyEmail} = require('../controllers/usercontrollers/postroutes.js')

router.route('/login').get(loginPage);
router.route('/signup').get(signupPage);
router.route('/verifyemail').get(verificationPage);
router.route('/logout').get(logout);

router.route('/login').post(login);
router.route('/signup').post(signUp);
router.route('/verifyemail').post(verifyEmail);

module.exports = router;
