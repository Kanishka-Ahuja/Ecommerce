const express = require('express')
const router = express.Router()

const {isfav} = require('../controllers/favorite/get')

const {addToFav,removefromfav} = require('../controllers/favorite/post')

router.route('/isfav').get(isfav)

router.route('/addtofav').post(addToFav);
router.route('/removefromfav').post(removefromfav);

module.exports = router