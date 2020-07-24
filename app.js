// npm install express mongoose --save
// npm install passport passport-local --save
// npm install passport-local-mongoose --save
// npm install body-parser --save
// npm install express-session --save
// npm install ejs --save

const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('home');
});

app.listen(process.env.PORT || 3000, process.env.IP, function() {
  console.log('server has started');
});