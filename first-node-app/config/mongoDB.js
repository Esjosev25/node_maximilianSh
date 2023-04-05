const mongoose = require('mongoose');

const createLog = require('./logger');
const logger = createLog('MongoDB');
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const mongoUrl = `mongodb://${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_NAME}`;
    await mongoose.connect(mongoUrl, {
      authSource: 'admin',
      user: process.env.MONGO_USERNAME,
      pass: process.env.MONGO_PASSWORD,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Mongo DB Connected');
  } catch (err) {
    logger.error(err);
    //exit process w failure
    process.exit(1);
  }
};

module.exports = {
  connectMongoDB: connectDB,
};
