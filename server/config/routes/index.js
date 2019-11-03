const app           = module.exports = require('express')();

const attachment    = require('./attachment');
const category      = require('./category');
const favorite      = require('./favorite');
const item          = require('./item');
const oauth         = require('./oauth');
const order         = require('./order');
const user          = require('./user');
const cart          = require('./cart');
const event         = require('./event');

app.use('/attachment', attachment);
app.use('/categories', category);
app.use('/favorites', favorite);
app.use('/items', item);
app.use('/oauth', oauth);
app.use('/orders', order);
app.use('/users', user);
app.use('/cart', cart);
app.use('/events', event);

app.use('*', (req, res, next) => {
    return res.send({ status: 404, messaege: 'Endpoint not found'});
})