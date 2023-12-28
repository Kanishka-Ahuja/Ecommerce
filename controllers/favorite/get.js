const favorite = require('../../models/favorite')

const isfav = async(req,res)=>{

    let id = req.query.id
    let email = req.session.Email
    let data = await favorite.findOne({User: email})

    let found = {val:0}
    if(data){

        data = data.products
        data.forEach((url)=>{
            if(url==id){
                found.val = 1
            }
        })
    }

    res.send(found)
}

module.exports = {isfav}
