const express =  require('express')
const router = express.Router()

const  multer= require('multer')

const upload = multer({dest: __dirname+'../../uploads/'})

const {
    adminPage
} = require('../controllers/admin/get')

const {
    addProducts
} = require('../controllers/admin/post')


router.route('/addproducts').post(upload.single('ProductImage'),addProducts);

router.route('/318k2i21d7t25788978').get(adminPage);

module.exports = router;