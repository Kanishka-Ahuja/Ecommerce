const express = require('express')
const router = express()

const {showProducts,loadmoreProducts} = require('../controllers/productcontrollers/getroutes.js');

router.route('/home').get(showProducts);
router.route('/loadmore').get(loadmoreProducts);

module.exports = router;