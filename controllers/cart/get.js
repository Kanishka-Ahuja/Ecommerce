const cart = require('../../models/cart.js')
const product = require('../../models/product.js')
const handleError = require('../error')

const showcart = async (req, res) => {

    try {

        let email = req.session.Email

        const data = await cart.findOne({ User: email });

        if (!data) {

            res.redirect('/notfound');

        }
        let products = data.product
        console.log(products)

        let object = {Url:'',Qty:0,Price:0,Title:''}
        let objarray = products.map(async(element)=>{

            let url = element.Url
            let result =  await product.findOne({Url:url},()=>{
                object.Url = element.Url
                    object.Qty = element.Qty
                    object.Price = result.Price
                    object.Title = result.Title
                    console.log(object)
                    return object;
            })

                    

                    
                    
        })

        console.log(objarray)
        res.render("viewcart.ejs", { data: objarray})

    }
    catch (err) {

        handleError(err, res)

    }
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

const countitems = async(req,res) =>{
    let email = req.session.Email

    let data =  await cart.findOne({User:email})
    let obj = {length :0}
    if(data){
        data = data.product
        obj.length =  data.length
    }
    res.json(obj)
}

const incart = async(req,res)=>{

    let id = req.query.id
    let email = req.session.Email
    let data = await cart.findOne({User: email})

    let found = {val:0}
    if(data){

        data = data.product
        console.log(data)
        data.forEach((obj)=>{
            if(obj.Url==id){
                found.val = 1
            }
        })
    }
    console.log(found)
    res.send(found)
}

module.exports = { showcart, getcart, countitems,incart }