var mongoose = require("mongoose");
var Skiresort = require('./models/skiresorts');
var Comment = require("./models/comments");

var skiresorts = [
   {name: 'Deer Valley', image: 'https://farm3.staticflickr.com/2215/2180936615_6601d11bc1.jpg', description: "Enjoy the best of Park City, Utah skiing at Deer Valley Resort! Whether you want to hike, bike or ski Deer Valley, there's something for everyone to enjoy"},
   {name: 'Park City Mountain', image: 'https://farm3.staticflickr.com/2335/2180937479_b57ef35dce.jpg', description: "Park City offers top ranked ski and snowboard facilities, with 7300 acres of terrain. Our experiences make it impossible to not have fun." },
   {name: 'Alta', image: 'https://farm3.staticflickr.com/2304/2181723762_4bc421c547.jpg', description: 'Altas micro climate, 2,200 acres and 2,020 foot vertical gain bring over 500 inches of fresh snow for skiers year after year after year after year. ... A great powdery environment, less expensive lift tickets and close proximity to Salt Lake City make Alta one of Utahs premier resort'},
   {name: 'Solitude', image: 'http://snowbrains.com/wp-content/uploads/2014/10/xlarge.jpg', description: 'Just 30 minutes from Salt Lake City and with over 1200 acres… one of Utahs most intimate mountain resorts'}
];

var comment = {
   text: 'This is a greate ski resort ... but, they need to groom the slopes a bit more often',
   authoer: 'John Jones'
};

function SeedDB() {

   Skiresort.remove({}, function(err){
      if(err) {
         console.log(err);
         return;
      } else {
         console.log("Removed Ski Resorts");
         createSkiresort();
      }
      
   });

}

function createSkiresort () {
   skiresorts.forEach(function(skiresort){
      Skiresort.create(skiresort, function(err, resort){
         if (err) {
            console.log(err);
            return;
         } else {
            console.log('Ski Resoprt Created');
            
            // Create comment
            createComment(resort);
         }
         
      });     
   });

}

function createComment(resort) {
   Comment.create(comment, function(err, comment){
      if (err) {
         console.log(err);
         return;
      }
      resort.comments.push(comment);
   });
}

module.exports = SeedDB;