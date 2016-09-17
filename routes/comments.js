var express = require("express"),
    router  =  express.Router();

var SkiResort = require("../models/skiresorts"),
      Comment = require("../models/comments");

// ============================================
// ========== Comment Routes ==================
// ============================================

router.get('/skiresorts/:id/comments/new', isLoggedIn, function(req, res){
   SkiResort.findById(req.params.id, function(err, skiresort){
      if (err) {
         console.log(err);
         return;
      }
      res.render('comments/new', {skiresort: skiresort});
   });
});

router.post('/skiresorts/:id/comments', isLoggedIn, function(req, res){
   var path = '/skiresorts/' + req.params.id;
   SkiResort.findById(req.params.id, function(err, resort){
      if(err) {
         console.log(err);
         res.redirect(path);
      }
      
      Comment.create(req.body.comment, function(err, newComment){
         if (err) {
            console.log(err);
            res.redirect(path);
         }
         
         resort.comments.push(newComment);
         resort.save();;
         res.redirect(path);
         
      });
   });
});

function isLoggedIn(req, res, next){
   console.log(req.body.username);
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;