const models = require('../models');
const sequelize = require('./database');

const createLog = require('./logger');
const logger = createLog('PopulateDb');

const associationsDb = async () => {
  models.Product.belongsTo(models.User, {
    constraints: true,
    onDelete: 'CASCADE',
  });
};
const bulkDb = async () => {
  try {
    let user = await models.User.findOne({
      where: {
        email: process.env.FIRST_EMAIL,
      },
    });
    if (!user) {
      user = await models.User.create({
        name: process.env.FIRST_USER,
        email: process.env.FIRST_EMAIL,
      });
      user.save();
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
  const user = await models.User.findOne({
    where: {
      email: process.env.FIRST_EMAIL,
    },
  });
  return user;
};
module.exports = { populateDB, getFirstUserDb };
