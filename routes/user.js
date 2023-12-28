const express = require('express')
const router = express.Router()

const {
    loginPage,
    signupPage,
    verificationPage,
    passwordForm,
    logout 
} = require('../controllers/user/get')

const {
    login,
    signUp,
    verifyEmail, 
    changePassword
} = require('../controllers/user/post')

router.route('/login').get(loginPage);
router.route('/signup').get(signupPage);
router.route('/verifyemail').get(verificationPage);
router.route('/changeP').get(passwordForm);
router.route('/logout').get(logout);

router.route('/login').post(login);
router.route('/signup').post(signUp);
router.route('/verifyemail').post(verifyEmail);
router.route('/changeP').post(changePassword);

module.exports = router;
