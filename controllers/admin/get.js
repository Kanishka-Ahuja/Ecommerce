const path = require('path')
const fs = require('fs').promises;

const adminPage = async (req, res) => {

    try {

        const filepath = path.join(process.cwd(), '/public/admins/admin.html')
        await fs.access(filepath);
        res.sendFile(filepath)

    }
    catch (error) {

        console.log("Error : ", error.message)

        if (error.code === 'ENOENT') {
            res.redirect('/notfounderror')
        }
        else if (error.code === 'EACCES') {
            res.redirect('/accessdenied')
        }
        else {
            res.redirect('/servererror')
        }

    }

}

module.exports = { adminPage };