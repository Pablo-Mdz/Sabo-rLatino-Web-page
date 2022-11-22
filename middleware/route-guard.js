function isLoggedIn(req, res, next) {
    // Check if user is logged in
    if (!req.session.user) {
        return res.redirect("/auth/login")
    }
    else{
    next()
    }
}

// function isAdmin ( req,res,next){
//     if((req.user.role !== ))
// }


module.exports = {
    isLoggedIn
}
