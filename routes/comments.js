var express = require("express"),
    router  =  express.Router({mergeParams: true}); // mergeParams: true will merge both SkiResort & Comments

var SkiResort = require("../models/skiresorts"),
      Comment = require("../models/comment");

// ============================================
// ========== Comment Routes ==================
// ============================================

// Routes appended with: /skiresorts/:id/comments

router.get('/new', isLoggedIn, function(req, res){
   SkiResort.findById(req.params.id, function(err, skiresort){
      if (err) {
         console.log(err);
         return;
      }
      res.render('comments/new', {skiresort: skiresort});
   });
});

// CREAT comment
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

// EDIT Comment
router.get("/:comment_id/edit", function(req, res){
   Comment.findById(req.params.comment_id, function(err, comment){
      if(err) {
         console.err('Edit Comment Error: ' + err);
         res.redirect('back');
      } else {
         res.render('comments/edit', {category_id: req.params.id, comment: comment});
      }
   });
});

// UPDATE Comment
router.put('/:comment_id', function(req, res){
   // res.send('Update Comment');
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
      if (err) res.redirect('back');
      else res.redirect('/skiresorts/' + req.params.id);
   });
});

// TODO: DESTROY Comment
router.delete("/:comment_id", function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if (err) res.redirect('back');
      else res.redirect('/skiresorts/' + req.params.id);
   })
});

// TODO: Move to a middleware file
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;