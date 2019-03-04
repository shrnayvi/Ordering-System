require('module-alias/register')
const app = require('@config/settings');

const routes = require('@server/routes');
app.use(routes);

module.exports = app;