require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const createLog = require('./config/logger');
const logger = createLog('app');

const errorController = require('./controllers/error');

const { populateDB, getFirstUserDb } = require('./config/populateDb');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(async (req, res, next) => {
  const user = await getFirstUserDb();
  if (!user) {
    logger.error('First User couldnt be loaded');
    process.exit(1);
  }

  req.user = user;
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

populateDB()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port);
    logger.info(`Server is running on PORT ${port}`);
  })
  .catch((error) => {
    logger.error(error);
    process.exit(1);
  });
