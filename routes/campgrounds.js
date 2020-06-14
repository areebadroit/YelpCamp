var express = require('express');
var router = express.Router();

var Campground = require('../models/campground'),
    Comment = require('../models/comment');

//SHOW - show all campgrounds in database
router.get("/campgrounds", (req, res) => {
    // console.log(req.user);
    Campground.find({}, (err,allCampgrounds) => {
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
});

//CREATE - add new campground to DB
router.post("/campgrounds", isLoggedIn, (req, res) => {
    console.log(req.body);
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    console.log(newCampground);
    //campgrounds.push();
    Campground.create(newCampground, (err, campground) => {
        if(err){
            console.log(err);
        }else{
            campground.author.id = req.user._id;
            campground.author.username = req.user.username;
            campground.save();
            console.log(campground);
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
router.get("/campgrounds/new", isLoggedIn, (req, res) => {
    res.render("new")
});

//SHOW - show more info about one campground
router.get("/campgrounds/:id", (req, res) => {
    //find campground with provided id
    Campground.findById(req.params.id).populate("comments").exec( (err, foundCampground) => {
        if(err){
            console.log(err);
        }else{
            res.render("show", {campground: foundCampground});
        }
    });
});

//EDIT
router.get("/campgrounds/:id/edit", checkCampgroundOwnership,(req, res) => {
    //find campground with provided id 
    //is user logged in
        //does he own the campground
        Campground.findById(req.params.id, (err, foundCampground) => {
            res.render("edit", {campground: foundCampground});
        });
});

router.put("/campgrounds/:id", checkCampgroundOwnership, (req, res) => {
    //find campground with provided id and edit
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var updateCampground = {name: name, image: image, description: description};
    Campground.findByIdAndUpdate(req.params.id, updateCampground, (err, foundCampground) => {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});
//DELETE
router.delete("/campgrounds/:id", checkCampgroundOwnership,(req, res) => {
    //find campground with provided id and delete
    Campground.findByIdAndDelete(req.params.id,  (err, foundCampground) => {
        if(err){
            res.redirect("/campgrounds");
        }else{
            // Comment.remove({}, function(err) {
            //     if(err){
            //         console.log(err);
            //     }
            res.redirect("/campgrounds");
        }
    });
});

function checkCampgroundOwnership(req, res, next){
    if(req.isAuthenticated()){
        // console.log(req.params.id);
        Campground.findById(req.params.id, (err, foundCampground) => {
            if(err){
                console.log(err);
                res.redirect("back");
            }else{
                // console.log(req.user._id);
                // console.log(foundCampground.author.id);
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    res.redirect("back");
                }
            }
        });
    }else{
        res.redirect("back");
        
    }
}

function isLoggedIn(req, res, next)  {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;