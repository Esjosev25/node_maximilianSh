const { Schema, model } = require('mongoose');

const ProductSchema = new  Schema({

  title: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

module.exports = model('Produt', ProductSchema);
