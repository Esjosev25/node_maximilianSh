const express = require('express');
var fs = require('fs');
var morgan = require('morgan');
var path = require('path');
const app = express();

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a',
});

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  console.log('In the middleware');
  next();
});
app.use((req, res, next) => {
  console.log('In another middleware');
  res.send(`<h1>Hola from express!</h1>`);
});
app.listen(3000);
