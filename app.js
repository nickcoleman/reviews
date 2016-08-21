var   express     = require("express"),
      app         = express(),
      bodyParser  = require("body-parser"),
      mongoose    = require('mongoose');

// Models
var   SkiResort   = require('./models/skiresorts.js'),
      Comments    = require('./models/comments.js');


// Setup
mongoose.connect("mongodb://localhost/reviews");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// ======== ROUTES =============   
app.get("/", function(req, res){
   res.render("landing");
});

// Ski Resort Routes
// Index SkiResort
app.get('/skiresorts', function(req, res){
   SkiResort.find({}, function(err, skiresorts){
      if (err) {
         console.error(err);
      } else {
         res.render('index', {skiresorts: skiresorts});
      }
   });
   
});

// New Ski Resort
app.get('/skiresorts/new', function(req, res){
   res.render('new');
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
   SkiResort.findById(id, function(err, foundSkiresort){
      if (err) {
         console.log(err);
         return;
      }
      res.render('show', {skiresort: foundSkiresort});
   });
});


// Edit SkiResort
app.get('skiresorts/:id/edit', function(req, res){
   SkiResort.findByIdAndUpdate
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

// ===== Server Setup ==============
app.listen(process.env.PORT, process.env.IP, function(){
   console.log('Reviews Server started');
});