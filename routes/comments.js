var express = require('express');
var router = express.Router();

var Campground = require('../models/campground'),
    Comment = require('../models/comment');

var middleware = require('../middleware');//index.js file contents will be taken automatically

router.get("/campgrounds/:id/comments/new",  middleware.isLoggedIn, (req, res) => {
    res.render("comments/new");
});

router.post("/campgrounds/:id/comments/new", middleware.isLoggedIn, (req, res) => {
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
                    req.flash("error", "Something went wrong.");
                    //console.log(err);
                }else{
                    //console.log(newComment);
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.save();
                    campground.comments.push(newComment);
                    campground.save();
                    req.flash("success", "Successfully added a comment.");
                    res.redirect("/campgrounds/"+ postId);
                }
            });
        }
    });
});

router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit", {campground_id:req.params.id, comment: foundComment});
        }
    });
});

router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, foundComment) => {
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndDelete(req.params.comment_id, (err, foundComment) => {
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

// function checkCommentOwnership(req, res, next){
//     if(req.isAuthenticated()){
//         // console.log(req.params.id);
//         Comment.findById(req.params.comment_id, (err, foundComment) => {
//             if(err){
//                 console.log(err);
//                 res.redirect("back");
//             }else{
//                 if(foundComment.author.id.equals(req.user._id)){
//                     next();
//                 }
//                 else{
//                     res.redirect("back");
//                 }
//             }
//         });
//     }else{
//         res.redirect("back");
//     }
// }

// function isLoggedIn(req, res, next)  {
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }

module.exports = router;