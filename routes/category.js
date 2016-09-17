var express = require("express"),
    router  =  express.Router();

var SkiResort = require("../models/skiresorts");

// ===============================================
// ============ Ski Resort Routes ================
// ===============================================

// Index SkiResort
router.get('/skiresorts', function(req, res){
   
   SkiResort.find({}, function(err, skiresorts){
      if (err) {
         console.error(err);
      } else {
         res.render('skiresorts/index', {skiresorts: skiresorts});
      }
   });
   
});

// New Ski Resort
router.get('/skiresorts/new', isLoggedIn, function(req, res){
   res.render('skiresorts/new');
});

// Create SkiResort
router.post('/skiresorts', function(req, res){

   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var newSkiresort = {name: name, image: image, description: desc};

   SkiResort.create(newSkiresort, function(err, newSkiresort){
      if (err) {
         console.error(err);
      } else {
         res.redirect('/skiresorts');
      }
   });
});

  
// Show SkiResort
router.get('/skiresorts/:id', function(req, res){
   var id = req.params.id;
   SkiResort.findById(id).populate('comments').exec(function(err, foundSkiresort){
      if (err) {
         console.log(err);
         return;
      }
      res.render('skiresorts/show', {skiresort: foundSkiresort});
   });
});


// Edit SkiResort
router.get('skiresorts/:id/edit', function(req, res){
   res.send('Edit a specific Ski Resort');
});


// Update SkiResort
router.put('skiresorts/:id', function(req, res){
   res.send('Update a Specific Ski Resort');
});


// Destroy SkiResort
router.delete('skiresorts/:id', function(req, res){
   res.send('Delete a specific Ski Resort');
});


function isLoggedIn(req, res, next){
   console.log(req.body.username);
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;