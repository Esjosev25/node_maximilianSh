const {DataTypes} = require('sequelize');

const sequelize = require('../config/database');

const Cart = sequelize.define('cart', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
state:{
  type: DataTypes.BOOLEAN,
  allowNull: false
}
});

module.exports = Cart;