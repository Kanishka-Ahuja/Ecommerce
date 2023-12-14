const path = require('path')
const fs = require('fs').promises;
const handleError = require('../error')

const adminPage = async (req, res) => {

    try {

        const filepath = path.join(process.cwd(), '/public/admin/admin.html')
        await fs.access(filepath)
        res.sendFile(filepath)

    }
    catch (err) {

        handleError(err,res)

    }

}

module.exports = { adminPage };