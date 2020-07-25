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

app.use(require("express-session")({
  secret: "Rusty is the best and cutest dog in the world",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//========
// ROUTES
//========

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/secret', function(req, res) {
  res.render('secret');
});

app.listen(process.env.PORT || PORT, process.env.IP, function() {
  console.log(`the server has started in port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});