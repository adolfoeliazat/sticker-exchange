var http = require('http');
var express = require('express');
var app = express();

//MongoDB setup
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
var User = require('./model/user');

var session = require('express-session');
app.use(session({
	secret: 'stickers',
	resave: false,
	saveUnitialized: true
}));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
	req.session.user = null;
	res.json({ message: 'session.user = null' });  
	//res.render('pages/login'); //TODO
});

var user1 = new User({
		username: 'Poorva-s',
		name: 'poorva',
		email: 'p.s@gmail.com',
		password: 'password',
		sticker: ['github', 'pearlhacks', 'mlh']
});

var user4 = new User({
		username: 'Goorva-s',
		name: 'poorva',
		email: 'p.s@gmail.com',
		password: 'password',
		sticker: ['github', 'pearlhacks', 'mlh']
});

var user2 = new User({
		username: 'Connie-s',
		name: 'connie',
		email: 'c.s@gmail.com',
		password: 'password',
		sticker: ['github', 'wordpress', 'redhat']
});

var user3 = new User({
		username: 'Helen-s',
		name: 'helen',
		email: 'h.s@gmail.com',
		password: 'password',
		sticker: ['aws', 'redhat', 'mlh', 'pusheen']
});

user1.save(function(err, user) {
  if (err) return console.error(err);
  //console.dir(user);
});

user2.save(function(err, user) {
  if (err) return console.error(err);
  //console.dir(user);
});

user3.save(function(err, user) {
  if (err) return console.error(err);
  //console.dir(user);
});

user4.save(function(err, user) {
  if (err) return console.error(err);
  //console.dir(user);
});

app.post('/signup', function(req, res){
	var user = new User({
		username: req.params.username,
		name: req.params.name,
		email: req.params.email,
		password: req.params.password,
	});

	var user = new User(req.body);

	user.save(function(err){
  		if (err) return console.error(err);
  		res.json(user);
  		console.dir(user);
	});
	req.session.user = req.params.username;
});


User.remove(function(err, user){
	if (err) return console.error(err);
  	//console.dir(user);
});

app.get('/all', function(req, res){ 
	User.find(function(err, user){
		if (err) return console.error(err);
	  	res.json(user);
	});
});

app.get('/search/:sticker', function(req, res){
	var username = req.session.user;

	if(!username) {
		res.json({message: 'invalid user : ' + req.params.username});
		//res.render('pages/login');
	}
	User.find({ sticker:  { $in : req.params.sticker } }, function(err, user) {
		  if (err) return console.error(err);
		  console.dir(user);
		  if(user == null){
			return res.json(user);
		  	//go to login page
		  }
			res.json(user);
	});
});

app.get('/search_name/:name', function(req, res){
	var username = req.session.user;

	if(!username) {
		res.json({message: 'invalid user : ' + req.params.name});
		//res.render('pages/login');
	}
	User.find({name: req.params.name}, function(err, users) {
		  if (err) return console.error(err);
		  console.dir(users);
		  if(users == null){
		  	return res.json(users);
		  	//go to login page
		  }
			res.json(users);
	});
});

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/:username')
	.get(function (req, res) {
		User.findOne({ username: req.params.username }, function(err, user) {
		  if (err) return console.error(err);
		  console.dir(user);
		  if(user == null){
	  		return res.json(user);
		   	//go to login page
		  }
		  	req.session.user = req.params.username;
			res.json({message: 'hello ' + req.params.username});
		});
		//res.render('/pages/index');
	});

app.use('/api', router);
// =============================================================================

app.listen(8080);
console.log('Magic happens on port 8080');