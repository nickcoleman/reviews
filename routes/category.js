// ===============================================
// =============  Category Routes ================
// ===============================================

// TODO: Refactor to allow multiple categories (i.e. not just skiresorts)

// Routes begin with: /skiresorts

var express = require("express"),
    router  =  express.Router();

var SkiResort = require("../models/skiresorts");

// Index SkiResort
router.get('/', function(req, res){
   
   SkiResort.find({}, function(err, skiresorts){
      if (err) {
         console.error(err);
      } else {
         res.render('skiresorts/index', {skiresorts: skiresorts});
      }
   });
   
});

// New Ski Resort
router.get('/new', isLoggedIn, function(req, res){
   res.render('skiresorts/new');
});

// Create SkiResort
router.post('/', function(req, res){

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
router.get('/:id', function(req, res){
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
router.get('/:id/edit', function(req, res){
   res.send('Edit a specific Ski Resort');
});


// Update SkiResort
router.put('/:id', function(req, res){
   res.send('Update a Specific Ski Resort');
});


// Destroy SkiResort
router.delete('/:id', function(req, res){
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