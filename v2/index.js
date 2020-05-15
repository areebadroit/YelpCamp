var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

const database =  'mongodb+srv://areeb:5m3uR2CfNntiqbLb@test-icewh.mongodb.net/test?retryWrites=true&w=majority' || 'mongodb://localhost:27017/yelpcamp';
mongoose.connect(database, { useNewUrlParser: true,useUnifiedTopology: true}, (err) => {
    if(err)
        console.log('Unable to connect to mongoDB servers');
    else 
        console.log('Connected to MongoDB servers');
});

//Schema Setup
var campgroudSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroudSchema);

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

//INDEX
app.get("/", (req, res) => {
    res.render("landing");
});

//SHOW - show all campgrounds in database
app.get("/campgrounds", (req, res) => {
    Campground.find({}, (err,allCampgrounds) => {
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds", {campgrounds: allCampgrounds});
        }
    });
});

//CREATE - add new campground to DB
app.post("/campgrounds", (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    // campgrounds.push();
    Campground.create(newCampground, (err, campground) => {
        if(err){
            console.log(err);
        }else{
            console.log(campground);
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
app.get("/campgrounds/new", (req, res) => {
    res.render("new")
});

//SHOW - show more info about one campground
app.get("/campgrounds/:id", (req, res) => {
    //find campground with provided id
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err){
            console.log(err);
        }else{
            res.render("show", {campground: foundCampground});
        }
    });
});


app.get("*", (req, res) => {
    res.render("error");
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`The YelpCamp Server has started`);
});