const cart = require('../../../database/cart.js')
const product = require('../../../database/product.js')

const addProduct = async (req, res) => {
    let id = req.body.id
    product.findOne({ Url: id }, function (err, data) {
        const info = {}
        info.Url = data.Url
        info.Title = data.Title
        info.Price = data.Price
        info.Qty = 1
        let email = req.session.Email
        cart.findOne({ User: email }, function (err, data) {
            let data1 = data.product
            data1.push(info)
            cart.findOneAndUpdate({ User: email }, { product: data1 }, function (err, data) {
                res.send({ redirectTo: '/cart/showcart' })
                // res.send("added")
            })
        })
    })
}

const removeProduct = async (req, res) => {
    let id = req.body.id
    product.findOne({Url:id},function(err,data){
      let email = req.session.Email
      cart.findOne({User:email},function(err,data){
        let data1 = data.product
        let j = data1.filter(function(obj)
        {
          return obj.Url!==id;
        })
        cart.findOneAndUpdate({User: email},{product:j},function(err,data){
          res.send({redirectTo : '/cart/showcart'})
        })
      })
    })
}

const incrementProduct = async (req, res) => {
    let id = req.body.id
    let email = req.session.Email
    cart.findOne({ User: email }, function (err, data) {
        let info = data.product
        for (let j = 0; j < info.length; j++) {
            if (info[j].Url == id) {
                temp = info[j].Qty
                temp = temp + 1;
                info[j].Qty = temp
            }
        }
        cart.findOneAndUpdate({ User: email }, { product: info }, function (err, data) {
            res.json(temp)
        })
    })
}

const decrementProduct = async (req, res) => {
    let id = req.body.id
    let email = req.session.Email
    cart.findOne({ User: email }, function (err, data) {
        let info = data.product
        for (let j = 0; j < info.length; j++) {
            if (info[j].Url == id) {
                temp = info[j].Qty
                if (temp != 1) {
                    temp = temp - 1;
                }
                info[j].Qty = temp
            }
        }
        cart.findOneAndUpdate({ User: email }, { product: info }, function (err, data) {
            res.json(temp)
        })
    })
}

module.exports = { addProduct, removeProduct, incrementProduct, decrementProduct }