// BASE SETUP
// =============================================================================

// call the packages we need
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

// configure app to use bodyParser()
// this will let us get the data from a POST
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
app.get('/', function(req, res) {
	req.session.user = null;
	res.render('pages/login'); //TODO
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// on routes that end in /user
// ----------------------------------------------------
router.route('/user') //DEBUGGING FUNCTIONS
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    })

    .delete(function(req, res) { //DEBUGGING FUNCTIONS
        User.remove(function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

router.route('/user/signup')

    // create a user (accessed at POST http://localhost:8080/api/user)
    .post(function(req, res) {
        
        var user = new User(req.body);

        User.find({'username': req.param.username}, function(err, user){
        	if (err)
                res.send(err);

            if(user != null)
            	res.json({ message: 'Username taken'});
           	else
        		user.save(function(err) {
            	if (err)
                	res.send(err);

                req.session.user = req.params.username;
            	res.json({ message: 'User created!' });
            	res.render('pages/home'); //TODO
        		});
		});
    });

router.route('/user/login')

    // create a user (accessed at POST http://localhost:8080/api/user)
    .post(function(req, res) {
        
        var user = new User(req.body);

        User.find({'username': req.param.username}, function(err, user){
        	if (err)
                res.send(err);

            if(user == null)
            	res.json({ message: 'Username not found'});
            	res.render('pages/login'); //TODO
            else
            	req.session.user = req.params.username;
        });
    });

router.route('/user/:username')

    .get(function(req, res) {
    	var username = req.session.user;

		if(!username) {
			response.render('pages/login'); //TODO
		}
        User.find({'username': req.param.username}, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })

    .delete(function(req, res) {
    	var username = req.session.user;

		if(!username) {
			response.render('pages/login'); //TODO
		}    	
        User.remove({'username': req.param.username}, function(err, user) {
            if (err)
                res.send(err);

            req.session.user = null;
			res.render('pages/login'); //TODO
            res.json({ message: 'Successfully deleted' });
        });
    });

router.route('/user/:sticker')
	
    .get(function(req, res) {
    	var username = req.session.user;

		if(!username) {
			response.render('pages/login'); //TODO    	
        User.find({'sticker': { $in : req.param.sticker }}, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(8080);
console.log('Magic happens on port 8080');
/*
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response) {
	request.session.user = null;
	response.render('pages/login');
});

app.post('/signup', function(req, res){
	
});

app.get('/login/:user/:password', function(req, res){
	
});

app.post('/add/:sticker', function(req, res){

});

app.get('/search', function(req, res){

});*/
