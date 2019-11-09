require('module-alias/register')
require('dotenv').config()
const app = require('@config/server');

const routes = require('@server/config/routes');
app.use(routes);

module.exports = app;