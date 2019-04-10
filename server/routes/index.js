const app           = module.exports = require('express')();
const attachment    = require('./attachment');
const user          = require('./user');
const oauth         = require('./oauth');

app.use('/attachment', attachment);
app.use('/users', user);
app.use('/oauth', oauth);

app.use('*', (req, res, next) => {
    res.send({ status: 404, messaege: 'Endpoint not found'});
})