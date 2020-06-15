var Campground = require('../models/campground'),
    Comment = require('../models/comment');
    
var middlewareObj = {};

middlewareObj.checkCommentOwnership = (req, res, next) => {
    if(req.isAuthenticated()){
        // console.log(req.params.id);
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if(err){
                console.log(err);
                res.redirect("back");
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    eq.flash("error", "You don't have permission to do that.");
                    res.redirect("back");
                }
            }
        });
    }else{
        eq.flash("error", "To add a comment, you need to be logged in.");
        res.redirect("back");
        
    }
}

middlewareObj.checkCampgroundOwnership = (req, res, next) => {
    if(req.isAuthenticated()){
        // console.log(req.params.id);
        Campground.findById(req.params.id, (err, foundCampground) => {
            if(err){
                //console.log(err);
                req.flash("error", "Campground not found.");
                res.redirect("back");
            }else{
                // console.log(req.user._id);
                // console.log(foundCampground.author.id);
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "To create a new campground, you need to be logged in.");
        res.redirect("back");
        
    }
}

middlewareObj.isLoggedIn =(req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please login First!");
    res.redirect("/login");
}

module.exports = middlewareObj;