var path = require('path')
var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 8080));
app.use(express.static(__dirname + '/'));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('pages/signup');
});

app.listen(8080);
console.log('8080 is the magic port! Hello World!');
