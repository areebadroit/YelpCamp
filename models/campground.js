var mongoose = require('mongoose');
//Schema Setup
var campgroudSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "campgroundUser"
      },
      username: String
   },
    comments: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment"
        }
     ]
});

module.exports = mongoose.model("Campground", campgroudSchema);
// Campground.create({
//     name: "Camp Exotica", image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60.jpgps://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e5074417c2c7cd5964fcc_340.jpg", description: "Description test"
// }, (err, campground) => {
//     if(err){
//         console.log(err);
//     }else{
//         console.log("NEWLY CREATED CAMPGROUND!")
//         console.log(campground);
//     }
// });

// var campgrounds = [
//     {name: "Camp Exotica", image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60.jpgps://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e5074417c2c7cd5964fcc_340.jpg"},
//     {name: "Rishikesh Valley camp", image: "https://images.unsplash.com/photo-1496080174650-637e3f22fa03?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60.jpg"},
//     {name: "Kipling Camp", image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60.jpg"},
//     {name: "West Ladakh Camp", image: "https://images.unsplash.com/photo-1534187886935-1e1236e856c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60.jpg"}
// ];