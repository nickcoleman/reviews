var express = require("express"),
    router  =  express.Router();

router.get("/", function(req, res){
   // res.render("landing");
   res.redirect('/skiresorts');
});

module.exports = router;