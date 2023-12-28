const favorite = require('../../models/favorite')
const handleError = require('../error')

const addToFav = async (req, res) => {

    try {

        let email = req.session.Email
        const data = await favorite.findOne({ User: email })

        if (!data) {
            res.redirect('/notfound')
        }

        let productList = data.products
        let id = req.body.id

        if (!productList.includes(id)){

            productList.push(id)
            const result = await favorite.findOneAndUpdate({ User: email }, { products: productList })

            if (!result) {
                res.redirect('/notfound')
            }
        }

        res.send()
    }
    catch (err) {
        handleError(err, res)
    }
}

const removefromfav = async (req, res) => {

    try {

        let email = req.session.Email
        const data = await favorite.findOne({ User: email })

        if (!data) {
            res.redirect('/notfound')
        }

        let productList = data.products
        let id = req.body.id 
        productList = productList.filter((obj) => {

            return obj != id

        })
        const result = await favorite.findOneAndUpdate({ User: email }, { products: productList })

        if (!result) {
            res.redirect('/notfound')
        }
        res.send()
    }
    catch (err) {

        handleError(err, res)
    }
}

module.exports = { addToFav, removefromfav }