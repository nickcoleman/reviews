var   express     = require("express"),
      app         = express(),
      bodyParser  = require("body-parser"),
      mongoose    = require('mongoose');

mongoose.connect("mongodb://localhost/reviews");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Schema
var skiresortSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

var SkiResort = mongoose.model("SkiResort", skiresortSchema);

// SkiResort.create({
//    name: 'Deer Valley', 
//    image: 'https://farm3.staticflickr.com/2215/2180936615_6601d11bc1.jpg',
//    description: 'Deer Valley continually ranks #1 in the US for a reason ... great service and grooming'
// },function(err, resort){
//    if(err) {
//       console.log(err);
//       return;
//    }
//    console.log(resort);
// });

// var skiresorts = [
//    {name: 'Deer Valley', image: 'https://farm3.staticflickr.com/2215/2180936615_6601d11bc1.jpg'},
//    {name: 'Park City Mountain', image: 'https://farm3.staticflickr.com/2335/2180937479_b57ef35dce.jpg'},
//    {name: 'Alta', image: 'https://farm3.staticflickr.com/2304/2181723762_4bc421c547.jpg'},
//    {name: 'Deer Valley', image: 'https://farm3.staticflickr.com/2215/2180936615_6601d11bc1.jpg'},
//    {name: 'Park City Mountain', image: 'https://farm3.staticflickr.com/2335/2180937479_b57ef35dce.jpg'},
//    {name: 'Alta', image: 'https://farm3.staticflickr.com/2304/2181723762_4bc421c547.jpg'},
//    {name: 'Deer Valley', image: 'https://farm3.staticflickr.com/2215/2180936615_6601d11bc1.jpg'},
//    {name: 'Park City Mountain', image: 'https://farm3.staticflickr.com/2335/2180937479_b57ef35dce.jpg'},
//    {name: 'Alta', image: 'https://farm3.staticflickr.com/2304/2181723762_4bc421c547.jpg'}
// ];
   

// ======== ROUTES =============   
app.get("/", function(req, res){
   res.render("landing");
});

// Ski Resort Routes
// Index SkiResort
app.get('/skiresorts/index', function(req, res){
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
   var newSkiresort = {name: name, image: image};

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
      res.render('skiresorts/show', {skiresort: foundSkiresort});
   })
});


// Edit SkiResort
app.get('skiresorts/:id/edit', function(req, res){
   res.send('Edit a specific Ski Resort');
})


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