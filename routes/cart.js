const express = require('express')
const router = express.Router()

const {
    showcart,
    getcart,
    countitems,
    incart,
} = require('../controllers/cart/get')

const {
    addProduct,
    removeProduct,
    incrementProduct,
    decrementProduct 
} = require('../controllers/cart/post')

router.route('/showcart').get(showcart);
router.route('/getcart').get(getcart);
router.route('/countitems').get(countitems)
router.route('/incart').get(incart);

router.route('/addProduct').post(addProduct);
router.route('/removeProduct').post(removeProduct);
router.route('/increment').post(incrementProduct);
router.route('/decrement').post(decrementProduct);

module.exports = router;