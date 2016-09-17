// ============================================
// ======= User Account Management ============
// ============================================   
  
var   express = require("express"),
      router  =  express.Router();

var   User = require("../models/user"),
      passport = require("passport");
      

// New User Account - Show Account Register Form
router.get("/register", function(req, res){
   res.render("register");
});

// Create User Account
router.post("/register", function(req, res){
   var newUser = new User({username: req.body.username});
   var password = req.body.password;
   User.register(newUser, password, function(err, user){
      if (err) {
         console.error("Error: " + err);
         return res.render("register");
      }
      passport.authenticate("local")(req, res, function(){
         res.redirect("/skiresorts");
      });
   });
});


// Edit User


// Update User


// Delete User


module.exports = router;