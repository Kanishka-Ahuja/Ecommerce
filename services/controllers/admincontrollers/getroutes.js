const path = require('path')
const adminPage = async(req,res)=>{
    res.sendFile(path.join(__dirname+'../../../../admin/admin.html'))
}

module.exports = {adminPage};