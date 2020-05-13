var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Camp Exotica", image: "https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e5074417c2c7cd5964fcc_340.jpg"},
    {name: "Rishikesh Valley camp", image: "https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e5074417c2c7cd5964fcc_340.jpg"},
    {name: "Kipling Camp", image: "https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf85254794076287ad59544_340.jpg"},
    {name: "West Ladakh Camp", image: "https://pixabay.com/get/54e5dc474355a914f1dc84609620367d1c3ed9e04e5074417c2c7cd5964fcc_340.jpg"}
];

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    campgrounds.push({name: name, image: image});
    res.redirect("/campgrounds")
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new")
});

app.get("*", (req, res) => {
    res.render("error");
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`The YelpCamp Server has started`);
});