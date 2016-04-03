var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    username: String,
    password: String,
    sticker: [String]
});

module.exports  = mongoose.model('User', userSchema);