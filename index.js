var path = require('path')
var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 8080));
app.use(express.static(__dirname + '/'));

app.set('view engine', 'ejs');

app.get('/index', function(req, res) {
    res.render('pages/index');
});

app.get('/login', function(req, res) {
    res.render('pages/login');
});

app.get('/signup', function(req, res) {
    res.render('pages/signup');
});


app.get('/dashboard', function(req, res) {
    res.render('pages/dashboard');
});

app.get('/search', function(req, res) {
    res.render('pages/search');
});


app.listen(8080);
console.log('8080 is the magic port! Hello World!');
