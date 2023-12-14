const product = require('../../models/product.js')

const addProducts = async (req, res) => {

    try {

        let { Title, Category, Description, Price } = req.body;

        const products = new product({
            Title,
            Category,
            Description,
            Price,
            Url : req.file.filename
        })

        await products.save()
        
        res.redirect('/admin/318k2i21d7t25788978')

    }
    catch (err) {

        handleError(err,res)

    }

}

module.exports = { addProducts };