
const loginPage = async (req, res) => {

    if (!req.session.login) {
        res.render('login.ejs', { Error: "" })
    }
    else {
        res.redirect('/product/home')
    }
}

const signupPage = async (req, res) => {
    if (!req.session.login) {
        res.render('signup.ejs', { Error: "" })
    }
}

const verificationPage = async (req, res) => {
    res.render("verify.ejs", { Error: "" });
}

const passwordForm = async(req,res) => {
    res.render('pswd.ejs', { Error: "" })
}

const logout = async (req, res) => {
    req.session.destroy();
    res.redirect('/')
}

module.exports = { loginPage, signupPage, verificationPage, passwordForm, logout }