const app           = module.exports = require('express')();

const attachment    = require('./attachment');
const category      = require('./category');
const item          = require('./item');
const oauth         = require('./oauth');
const user          = require('./user');

app.use('/attachment', attachment);
app.use('/categories', category);
app.use('/items', item);
app.use('/oauth', oauth);
app.use('/users', user);

app.use('*', (req, res, next) => {
    res.send({ status: 404, messaege: 'Endpoint not found'});
})