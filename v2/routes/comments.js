var express = require('express');
var router = express.Router();

var Campground = require('../models/campground'),
    Comment = require('../models/comment');

router.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res) => {
    res.render("comments/new");
});

router.post("/campgrounds/:id/comments/new", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        var postId = req.params.id;
        if(err){
            res.redirect("/campgrounds/" + postId);
        }else{
            var text =req.body.text;
            //var author =req.body.author;
            var comm = {text: text}
            Comment.create(comm, (err, newComment) => {
                if(err){
                    console.log(err);
                }else{
                    //console.log(newComment);
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.save();
                    campground.comments.push(newComment);
                    campground.save();
                    res.redirect("/campgrounds/"+ postId);
                }
            });
        }
    });
});

function isLoggedIn(req, res, next)  {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;