require('module-alias/register')
require('dotenv').config()

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const database = require('@config/database');
const connection = database.url();

const passport = require('@middlewares/passport');
const { log } = require('@utils/logs');

const dataPerPage	= +process.env.DATA_PER_PAGE;
const response= require('@server/api/responses/');

const logger = require('@config/logger');

/* Global variables */
global.log = log;
global.dataPerPage = dataPerPage;
global.apiResponse = response;
global.cap = require('@config/capabilities');
global.logger = logger;
mongoose.Promise = global.Promise;


app.use(cors());
app.use(passport.initialize());

/* Connect to mongodb */
mongoose.connect(connection, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });
mongoose.connection
.once('open', () => logger.info({ message: 'Database Connected' }))
.on('error', (error) => {
	logger.error({
		message: 'Error Connecting to the database',
		data: error,
	});
});

process.on('unhandledRejection', error => {
	logger.error({
		message: 'Unhandled Rejection',
		data: error,
	});
})

app.use(bodyParser.urlencoded({limit : '500kb','extended': 'true'}));
app.use(bodyParser.json({limit : '500kb'}));
app.use(express.static(path.join(__dirname, '../../client')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(cookieParser());

const routes = require('@server/config/routes');
app.use(routes);

module.exports = app;