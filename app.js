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
   image: String
});

var SkiResort = mongoose.model("SkiResort", skiresortSchema);

// SkiResort.create({
//    name: 'Park City Mountain', 
//    image: 'https://farm3.staticflickr.com/2335/2180937479_b57ef35dce.jpg'
// }, function(err, resort){
//    if(err) {
//       console.error(err);
//    } else {
//       console.log(resort);
//    }
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
app.get('/skiresorts', function(req, res){
   SkiResort.find({}, function(err, skiresorts){
      if (err) {
         console.error(err);
      } else {
         res.render('skiresorts', {skiresorts: skiresorts});
      }
   });
   
});

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
   })
   
   
});


app.get('/skiresorts/new', function(req, res){
   res.render('new');
});
   

// ===== Server Setup ==============
app.listen(process.env.PORT, process.env.IP, function(){
   console.log('Reviews Server started');
});