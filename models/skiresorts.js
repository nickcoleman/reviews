var mongoose = require("mongoose");

var skiresortSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

module.exports = mongoose.model('SkiResort', skiresortSchema);