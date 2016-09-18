var   express        = require("express"),
      app            = express(),
      bodyParser     = require("body-parser"),
      mongoose       = require('mongoose'),
      passport       = require("passport"),
      LocalStrategy  = require("passport-local");

// Models
var   SkiResort   = require('./models/skiresorts'),
      Comment     = require('./models/comment'),
      User        = require("./models/user");

// Routes
var   indexRoutes    = require("./routes/index"),
      categoryRoutes = require("./routes/category"),
      commentRoutes  = require("./routes/comments"),
      authRoutes     = require("./routes/auth"),
      userRoutes     = require("./routes/users");
      

// Seed Database
// var SeedDB = require("./seeds");
// SeedDB();

// Routing -- Restful


// Setup
mongoose.connect("mongodb://localhost/reviews");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
// app.use(express.static('./public'));

// Passport Configuration
app.use(require("express-session")({
   secret: "On-Time, On-Target",
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Whatever is placed in res.locals is available to every page
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

app.use(indexRoutes);
app.use("/skiresorts", categoryRoutes);
app.use("/skiresorts/:id/comments", commentRoutes);
app.use(authRoutes);
app.use(userRoutes);


// ============================================   
// ============= Server Setup =================
// ============================================   
app.listen(process.env.PORT, process.env.IP, function(){
   console.log('Reviews Server started');
});