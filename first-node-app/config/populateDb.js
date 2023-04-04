const { Product, User, Cart, CartItem } = require('../models');
const sequelize = require('./database');

const createLog = require('./logger');
const logger = createLog('PopulateDb');

const associationsDb = async () => {
  Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE',
  });
  User.hasMany(Product);
  User.hasOne(Cart);
  Cart.belongsTo(User);
  Cart.belongsToMany(Product, { through: CartItem });
  Product.belongsToMany(Cart, { through: CartItem });
};
const bulkDb = async () => {
  try {
    let user = await User.findOne({
      where: {
        email: process.env.FIRST_EMAIL,
      },
    });
    if (!user) {
      user = await User.create({
        name: process.env.FIRST_USER,
        email: process.env.FIRST_EMAIL,
      });
      
    }
  } catch (error) {
    logger.error(error);
  }
};

const populateDB = async () => {
  try {
    await associationsDb();
    await sequelize.sync({ force: false });
    await bulkDb();
  } catch (error) {
    logger.error(error);
  }
};
const getFirstUserDb = async () => {
  const user = await User.findOne({
    where: {
      email: process.env.FIRST_EMAIL,
    },
  });
  return user;
};
module.exports = { populateDB, getFirstUserDb };
