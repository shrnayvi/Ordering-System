const bodyParser 		= require('body-parser');
const cookieParser  	= require('cookie-parser')
const cors 				= require('cors')
const express 			= require('express');
const mongoose 			= require('mongoose');
const morgan 			= require('morgan');
const path				= require('path');

const { ApolloServer } = require('apollo-server-express');

const app 		 		= module.exports = express();

const database 			= require('./database');
const connection 		= database.url();
global.cap 				= require('./capabilities');
mongoose.Promise 		= global.Promise;

const passport 		= require('@middlewares/passport');
const { log } 			= require('@utils/logs');

const { dataPerPage }	= require('@config/config');
const response			= require('@server/responses/');

/* Global variables */
global.log				= log;
global.dataPerPage 		= dataPerPage;
global.apiResponse		= response;

app.use(cors());
app.use(passport.initialize());

/* Connect to mongodb */
mongoose.connect(connection, { useNewUrlParser: true, useFindAndModify: false });
mongoose.connection
.once('open', () => console.log('Database connected'))
.on('error', (error) => {
 	console.log(error,'error');
});

/* Logger */
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({limit : '500kb','extended': 'true'}));
app.use(bodyParser.json({limit : '500kb'}));
app.use(express.static(path.join(__dirname, '../../client')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(cookieParser());