require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const createLog = require('./config/logger');
const logger = createLog('app');

const errorController = require('./controllers/error');


const {populateDB} = require('./config/populateDb');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

populateDB();

const port = process.env.PORT || 3000;
app.listen(port);
logger.info(`Server is running on PORT ${port}`);

