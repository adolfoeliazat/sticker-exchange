// server.js
// load the things we need
var path = require('path')
var express = require('express');
var app = express();


app.use(express.static(__dirname + 'public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

app.listen(8080);
console.log('8080 is the magic port! Hello World!');