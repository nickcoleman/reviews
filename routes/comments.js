var express = require("express"),
      // mergeParams: true will merge both SkiResort & Comments
    router  =  express.Router({mergeParams: true});

var SkiResort = require("../models/skiresorts"),
      Comment = require("../models/comments");

// ============================================
// ========== Comment Routes ==================
// ============================================

// Routes start with: /skiresorts/:id/comments

router.get('/new', isLoggedIn, function(req, res){
   SkiResort.findById(req.params.id, function(err, skiresort){
      if (err) {
         console.log(err);
         return;
      }
      res.render('comments/new', {skiresort: skiresort});
   });
});

router.post('/', isLoggedIn, function(req, res){
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

// TODO: Edit Comment

// TODO: Move to a middleware file
function isLoggedIn(req, res, next){
   console.log(req.body.username);
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;