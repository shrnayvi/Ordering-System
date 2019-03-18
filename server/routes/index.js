const app       = module.exports = require('express')();
const user      = require('./user');
const oauth     = require('./oauth');

app.use('/users', user);
app.use('/oauth', oauth.google);

app.use('*', (req, res, next) => {
    res.send({ status: 404, messaege: 'Endpoint not found'});
})