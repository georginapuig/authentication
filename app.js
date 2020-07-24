// npm install express mongoose --save
// npm install passport passport-local --save
// npm install passport-local-mongoose --save
// npm install body-parser --save
// npm install express-session --save
// npm install ejs --save

const express = require('express');
const app = express();
const mongoose = require('mongoose');

// mongoose setup
mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to DB!'))
  .catch(error => console.log(error.message));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/secret', function(req, res) {
  res.render('secret');
});

app.listen(process.env.PORT || 3000, process.env.IP, function() {
  console.log('server has started');
});