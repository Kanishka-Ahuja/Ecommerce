const { default: mongoose } = require('mongoose')
const product = require('../../models/product.js')

const getProducts = async (req, res) => {

    const {id,pos} = req.query
    console.log("id = ",id,"pos = ",pos)
    const object = await product.findOne({Url:id})
    let data = object
    if(object)
    {
        let objectId = mongoose.Types.ObjectId(object)
        if(pos==0){
            data = await product.findOne({_id : {$lt: objectId}}).sort({_id:-1})
        }
        if(pos==2){
            data = await product.findOne({_id : {$gt: objectId}})
        }
    }
    console.log(data)
    res.send(data)
}

const showProducts = async (req, res) => {
    if (req.session.login) {

        product.find({}, function (err, data) {

            res.render("home.ejs", { name: req.session.name, data: data});
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

module.exports = { getProducts, showProducts, loadmoreProducts };