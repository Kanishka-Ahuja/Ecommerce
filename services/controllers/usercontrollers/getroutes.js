const loginPage = async(req,res)=>{
    if(!req.session.login)
    {
        res.render('./login/index.ejs',{Error :""})
    }
    else
    {
      res.redirect('/product/home')
    }
}

const signupPage = async(req,res)=>{
    if(!req.session.login)
    {
      res.render('./signup/index.ejs',{Error :""})
    }
}

const verificationPage =  async(req,res)=>{
    res.render("./verify/index.ejs",{Error : ""});
}

const logout = async(req,res)=>{
    req.session.destroy();
	res.redirect('/')
}

module.exports = {loginPage,signupPage,verificationPage,logout}