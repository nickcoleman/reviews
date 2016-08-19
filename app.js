var   express     = require("express"),
      app         = express(),
      bodyParser  = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var skiresorts = [
   {name: 'Deer Valley', image: 'https://farm3.staticflickr.com/2215/2180936615_6601d11bc1.jpg'},
   {name: 'Park City Mountain', image: 'https://farm3.staticflickr.com/2335/2180937479_b57ef35dce.jpg'},
   {name: 'Alta', image: 'https://farm3.staticflickr.com/2304/2181723762_4bc421c547.jpg'},
   {name: 'Deer Valley', image: 'https://farm3.staticflickr.com/2215/2180936615_6601d11bc1.jpg'},
   {name: 'Park City Mountain', image: 'https://farm3.staticflickr.com/2335/2180937479_b57ef35dce.jpg'},
   {name: 'Alta', image: 'https://farm3.staticflickr.com/2304/2181723762_4bc421c547.jpg'},
   {name: 'Deer Valley', image: 'https://farm3.staticflickr.com/2215/2180936615_6601d11bc1.jpg'},
   {name: 'Park City Mountain', image: 'https://farm3.staticflickr.com/2335/2180937479_b57ef35dce.jpg'},
   {name: 'Alta', image: 'https://farm3.staticflickr.com/2304/2181723762_4bc421c547.jpg'}
];
   

// ======== ROUTES =============   
app.get("/", function(req, res){
   res.render("landing");
});

// Ski Resort Routes
app.get('/skiresorts', function(req, res){
   res.render('skiresorts', {skiresorts: skiresorts});
});

app.post('/skiresorts', function(req, res){

   var name = req.body.name;
   var image = req.body.image;
   var newSkiresort = {name: name, image: image};

   skiresorts.push(newSkiresort);
   
   res.redirect('/skiresorts');
});


app.get('/skiresorts/new', function(req, res){
   res.render('new');
});
   

// ===== Server Setup ==============
app.listen(process.env.PORT, process.env.IP, function(){
   console.log('Reviews Server started');
});