const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.MDBNAME,
  process.env.MUSER,
  process.env.MPASSWORD,
  {
    dialect: process.env.MDIALECT,
    host: process.env.MIP,
    port: process.env.MPORT,
  }
);

module.exports = sequelize;
