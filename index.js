var bodyParser = require('body-parser'),
    express = require('express'),
    mongoose = require('mongoose'),
    methodOverride = require('method-override'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    PassportLocalMongoose = require('passport-local-mongoose'),
    app = express();

var Campground = require('./models/campground'),
    Comment = require('./models/comment'),
    CampgroundUser = require('./models/user'),
    seedDB = require('./seeds');
// seedDB();

var commentRoutes = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes = require('./routes/indexroutes');
//==================================================================================================

const database = 'mongodb+srv://areeb:zNntxsYsd8yhmYev@test-icewh.mongodb.net/test?retryWrites=true&w=majority'||'mongodb://localhost:27017/yelpcamp';
mongoose.connect(database, { useNewUrlParser: true,useUnifiedTopology: true}, (err) => {
    if(err)
        console.log('Unable to connect to mongoDB servers');
    else 
        console.log('Connected to MongoDB servers');
});

//==================================================================================================

app.use(require("express-session")({
    secret: "Lets be smart and hash our password because privacy matters",
    resave: false,
    saveUninitialized: false
}));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(CampgroundUser.authenticate()));
passport.serializeUser(CampgroundUser.serializeUser());
passport.deserializeUser(CampgroundUser.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.get("*", (req, res) => {
    res.render("error");
});
app.listen(process.env.PORT || 3000, () => {
    console.log(`The YelpCamp Server has started`);
});