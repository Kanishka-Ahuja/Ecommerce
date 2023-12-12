const express = require('express')
const router = express.Router()

const {
    showcart,
    getcart 
} = require('../controllers/cart/get')

const {
    addProduct,
    removeProduct,
    incrementProduct,
    decrementProduct 
} = require('../controllers/cart/post')

router.route('/showcart').get(showcart);
router.route('/getcart').get(getcart);

router.route('/addProduct').post(addProduct);
router.route('/removeProduct').post(removeProduct);
router.route('/increment').post(incrementProduct);
router.route('/decrement').post(decrementProduct);

module.exports = router;