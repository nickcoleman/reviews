var express = require("express"),
    router  =  express.Router({mergeParams: true}); // mergeParams: true will merge both SkiResort & Comments

var SkiResort = require("../models/skiresorts"),
      Comment = require("../models/comment");

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

// Create a comment
// 1st find the category then create the comment on it
router.post('/', isLoggedIn, function(req, res){
   var path = '/skiresorts/' + req.params.id; // TODO: dynamically create path
   SkiResort.findById(req.params.id, function(err, category){
      if(err) {
         console.log(err);
         res.redirect(path);
      }
      
      Comment.create(req.body.comment, function(err, comment){
         if (err) {
            console.log(err);
            res.redirect(path);
         }
         // add user name & id to the comment
         // -- we know there is a user because of isLoggedIn
         comment.author.id = req.user._id;
         comment.author.username = req.user.username;
         comment.save();
         console.log("Comment: " + comment);
         
         // save the comment to the category
         category.comments.push(comment);
         category.save();
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