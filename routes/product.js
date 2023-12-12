const express = require('express')
const router = express()

const {
    getProducts,
    showProducts,
    loadmoreProducts 
} = require('../controllers/product/get');

router.route('/getproducts').get(getProducts);
router.route('/home').get(showProducts);
router.route('/loadmore').get(loadmoreProducts);

module.exports = router;