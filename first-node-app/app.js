const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded());

app.use( require("./routes/admin"));
app.use(require('./routes/shop'));
app.use((req,res,next)=>{
  console.log(' hola banda')
  res.status(404).send('<h1>Page not found</h1>')
})
app.listen(3000);
