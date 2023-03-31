const express = require('express');
const router = express.Router();
router.get('/', (req, res, next) => {
  console.log('In another middleware');
  res.send(`<h1>Hola from express!</h1> <a href="/add-product"> add product</a>`);
});

module.exports = router;
