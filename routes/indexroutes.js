//===============================================ROUTES====================================================
//Authentication Routes
var express = require('express');
var router = express.Router();
var passport = require('passport');
var CampgroundUser = require('../models/user');
//Authentication ROUTES
router.get("/register", (req,res) => {
    res.render("register");
});

//handling user signup
router.post("/register", (req,res) => {
    var uname = req.body.username;
    var password = req.body.password;
    CampgroundUser.register(new CampgroundUser({username: uname}), password, (err, user) => {
        if(err){
            //console.log(err);
            req.flash("error", err.message);
            res.redirect("back");
            //return res.render("register");
        }
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "Welcome to YelpCamp "+ uname);
            res.redirect("/campgrounds");
        });
    });
});

//login route
router.get("/login", (req,res) => {
    res.render("login");
});
//login logic
//middleware
router.post("/login", passport.authenticate("local", {
    successRedirect: "campgrounds",
    failureRedirect: "back",
    failureFlash: true
}), (req, res) => {

});

//logout
router.get("/logout", (req,res) => {
    req.logout();
    req.flash("success", "Succesfully logged out.");
    res.redirect("/");
});

// function isLoggedIn(req, res, next)  {
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }


//INDEX
router.get("/", (req, res) => {
    res.render("landing");
});



module.exports = router;