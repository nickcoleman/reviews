var   express     = require("express"),
      app         = express(),
      bodyParser  = require("body-parser"),
      mongoose    = require('mongoose');

// Models
var   SkiResort   = require('./models/skiresorts'),
      Comment     = require('./models/comments'),
      User        = require("./models/user");

// Seed Database
// var SeedDB = require("./seeds");
// SeedDB();

// Routing


// Setup
mongoose.connect("mongodb://localhost/reviews");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
// app.use(express.static('./public'));

// ======== ROUTES =============   
app.get("/", function(req, res){
   // res.render("landing");
   res.redirect('/skiresorts');
});

// ===============================================
// ============ Ski Resort Routes ================
// ===============================================

// Index SkiResort
app.get('/skiresorts', function(req, res){
   SkiResort.find({}, function(err, skiresorts){
      if (err) {
         console.error(err);
      } else {
         res.render('skiresorts/index', {skiresorts: skiresorts});
      }
   });
   
});

// New Ski Resort
app.get('/skiresorts/new', function(req, res){
   res.render('skiresorts/new');
});

// Create SkiResort
app.post('/skiresorts', function(req, res){

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
app.get('/skiresorts/:id', function(req, res){
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
app.get('skiresorts/:id/edit', function(req, res){
   res.send('Edit a specific Ski Resort');
});


// Update SkiResort
app.put('skiresorts/:id', function(req, res){
   res.send('Update a Specific Ski Resort');
});


// Destroy SkiResort
app.delete('skiresorts/:id', function(req, res){
   res.send('Delete a specific Ski Resort');
});

// ============================================
// ========== Comment Routes ==================
// ============================================

app.get('/skiresorts/:id/comments/new', function(req, res){
   SkiResort.findById(req.params.id, function(err, skiresort){
      if (err) {
         console.log(err);
         return;
      }
      res.render('comments/new', {skiresort: skiresort});
   });
});

app.post('/skiresorts/:id/comments', function(req, res){
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
   
   
   


// ===== Server Setup ==============
app.listen(process.env.PORT, process.env.IP, function(){
   console.log('Reviews Server started');
});