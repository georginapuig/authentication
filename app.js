// npm install express mongoose --save
// npm install passport passport-local --save
// npm install passport-local-mongoose --save
// npm install body-parser --save
// npm install express-session --save
// npm install ejs --save

const express               = require('express'),
      mongoose              = require('mongoose'),
      passport              = require('passport'),
      bodyParser            = require('body-parser'),
      User                  = require('./models/user'),
      LocalStrategy         = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose');
const app = express();
const PORT = 3000;

// mongoose setup
mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to DB!'))
  .catch(error => console.log(error.message));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
  secret: "Rusty is the best and cutest dog in the world",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//========
// ROUTES
//========

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/secret', isLoggedIn, function(req, res) {
  res.render('secret');
});

//============
// AUTH ROUTES
//============

// REGISTER ROUTES

// show sign up form
app.get('/register', function(req, res) {
  res.render('register');
});

// handling user sign up
app.post('/register', function(req, res) {
  req.body.username;
  req.body.password;
  console.log(req.body.password);
  User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render('register');
    } else {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/secret');
      });
    }
  });
});

// LOGIN ROUTES

// render login form
app.get('/login', function(req, res) {
  res.render('login');
});

// login logic
// middleware. passport.authenticate
app.post('/login', passport.authenticate('local', {
  successRedirect: '/secret',
  failureRedirect: '/login'
}), function(req, res) {

});

// LOGOUT ROUTES

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


app.listen(process.env.PORT || PORT, process.env.IP, function() {
  console.log(`the server has started in port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});