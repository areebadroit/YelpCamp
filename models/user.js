var mongoose = require('mongoose');
PassportLocalMongoose = require('passport-local-mongoose');

var campgroudUserSchema = new mongoose.Schema({
    username: String,
    password: String
});

campgroudUserSchema.plugin(PassportLocalMongoose);

module.exports = mongoose.model("campgroundUser", campgroudUserSchema);