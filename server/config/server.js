const bodyParser 		= require('body-parser');
const cookieParser  	= require('cookie-parser')
const cors 				= require('cors')
const express 			= require('express');
const mongoose 			= require('mongoose');
const morgan 			= require('morgan');
const path				= require('path');

const app 		 		= module.exports = express();

const database 			= require('./database');
const connection 		= database.url();
global.cap 				= require('./capabilities');
mongoose.Promise 		= global.Promise;

const passport 		= require('@middlewares/passport');
const { log } 			= require('@utils/logs');

const dataPerPage	= +process.env.DATA_PER_PAGE;
const response			= require('@server/api/responses/');

/* Global variables */
global.log				= log;
global.dataPerPage 		= dataPerPage;
global.apiResponse		= response;

app.use(cors());
app.use(passport.initialize());

/* Connect to mongodb */
mongoose.connect(connection, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });
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