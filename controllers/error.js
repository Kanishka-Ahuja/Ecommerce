const handleError = async (error, res) => {

    try {

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
    catch (err) {

        console.log(err.message)

    }

}

module.exports = handleError;