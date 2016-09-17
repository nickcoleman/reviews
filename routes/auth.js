// ============================================
// ======= Authentication Routes ==============
// ============================================   

var express = require("express"),
    router  =  express.Router();

var   passport = require("passport");

// Show User Login Form
router.get("/login", function(req, res){
   res.render("login");
});

// Handle Login Logic
// Run passport.authenticate as middleware because we can presume the
// user already exists.  Also, don't need to use the function() callbac
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/skiresorts",
        failureRedirect: "/login"
    }), function(req, res){
});


// Logout
router.get("/logout", function(req, res){
   req.logout();  // provided by passport packages
   res.redirect('/');
});

function isLoggedIn(req, res, next){
   console.log(req.body.username);
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;