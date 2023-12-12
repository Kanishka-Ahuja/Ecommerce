const product = require('../../../database/product.js')

const addProducts = async (req, res) => {
    let { Title, Category, Description, Price } = req.body;
    const products = new product()
    products.Title = Title;
    products.Category = Category;
    products.Description = Description;
    products.Price = Price;
    products.Url = req.file.filename;
    products.save()
    res.redirect('/foradmin/318k2i21d7t25788978')
}

module.exports = {addProducts};