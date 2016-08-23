var mongoose = require("mongoose");
// var Comment =  require("./comments");

var skiresortSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Comment'
      }
   ]
});

module.exports = mongoose.model('SkiResort', skiresortSchema);