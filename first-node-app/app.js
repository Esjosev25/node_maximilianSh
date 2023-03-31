const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));

app.use('/', (req,res,next)=>{
  console.log('This always runs!')
  next();
});
app.use('/add-product', (req, res, next) => {
  console.log('In another middleware');
  res.send(
    `<form action="/product" method="POST"><input type="text" name="title"/><button  type="submit"> Hola</button></form><h1>Hola from add product!</h1>`
  );
});
app.use('/product', (req, res,next)=>{
  console.log('from product', req.body);
  res.redirect('/');
});
app.use('/', (req, res, next) => {
  console.log('In another middleware');
  res.send(`<h1>Hola from express!</h1>`);
});
app.listen(3000);
