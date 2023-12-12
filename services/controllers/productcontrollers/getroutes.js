const product = require('../../../database/product.js')
const path = require('path')
const showProducts = async (req, res) => {
    if (req.session.login) {
        req.session.load = 5
        product.find({}, function (err, data) {

            let temp = data.splice(0, 5);
            res.render("./home/index.ejs",{name : req.session.name,data:temp});
        })
    }
    else {
        res.redirect('/user/login')
    }
}

const loadmoreProducts = async (req, res) => {
    if (req.session.login) {
        product.find({}, function (err, data) {

            let load = 5;
            let start = req.session.load;
            let end = req.session.load + load;
            req.session.load = end
            let temp = []
            temp = data.splice(start, load)
            if (temp.length === 0) {
                res.end()
            }
            else {
                res.json(temp);
            }
        })
    }
    else {
        res.redirect('/user/login')
    }
}

module.exports = { showProducts, loadmoreProducts };