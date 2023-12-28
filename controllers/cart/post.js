const cart = require('../../models/cart.js')

const addProduct = async (req, res) => {
    let id = req.body.id
    let email = req.session.Email

    let data = await cart.findOne({User:email})
    let obj = {length : 0}
    if(data){

        let yes=false
        console.log("before addition",data)
        const info ={
            Url:id,
            Qty: 1
        }

        let newdata = data.product
        length = newdata.length
        newdata.forEach((obj)=>{
            if(obj.Url==id){
                yes=true
            }
        })
        if(!yes){

            console.log("after addition")
            newdata.push(info)
            obj.length = newdata.length
            console.log("newdata\n",newdata)
            await cart.findOneAndUpdate({User:email},{product: newdata})
            console.log(obj)
        }
    }
    res.json(obj)

}

const removeProduct = async (req, res) => {
    let id = req.body.id
      let email = req.session.Email
    let data =  await cart.findOne({User: email})
    let obj = {length :0}
    if(data){
        data = data.product
        console.log("before deletion",data)
        let newdata = data.filter((obj)=>{
            return obj.Url!=id;
        })
        obj.length = newdata.length
        console.log("after deletion",newdata)

        await cart.findOneAndUpdate({User:email},{product:newdata})
        console.log(obj)
    }
    res.json(obj)
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