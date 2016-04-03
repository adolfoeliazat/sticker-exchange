var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Sticker = new Schema({name: String});

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    username: String,
    password: String,
    sticker: [Sticker]
});

module.exports  = mongoose.model('User', userSchema);