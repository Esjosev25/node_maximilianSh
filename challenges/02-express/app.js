const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log('middleware1');
  next();
});
app.use((req, res, next) => {
  console.log('middleware2');
  next();
});
app.use('/users', (req, res, next) => {
  console.log('- middleware');
  res.send(`<h1>Hola from users!</h1>`);
});
app.use('/', (req, res, next) => {
  console.log('- middleware');
  res.send(`<h1>Hola from express!</h1>`);
});

app.listen(3000);
