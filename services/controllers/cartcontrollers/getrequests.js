const cart = require('../../../database/cart.js')

const showcart = async (req, res) => {

    let email = req.session.Email
    cart.findOne({ User: email }, function (err, data) {

        if (err) {

            console.log('Error : ', err)
            res.send("Error occured")

        }
        else {

            let products = data.product
            res.render("./home/viewcart.ejs", { data: products, name: req.session.name })
        }
    })
}

const getcart = async (req, res) => {

    let email = req.session.Email
    cart.findOne({ User: email }, function (err, data) {
        let info = data.product
        let temp = []
        for (let j = 0; j < info.length; j++) {
            temp[j] = info[j].Url
        }
        res.send(temp)
    })
}

module.exports = {showcart,getcart}