const app           = module.exports = require('express')();

const APIError      = require('@utils/APIError');

const attachment    = require('./attachment');
const cart          = require('./cart');
const category      = require('./category');
const event         = require('./event');
const favorite      = require('./favorite');
const item          = require('./item');
const oauth         = require('./oauth');
const order         = require('./order');
const orderDetail   = require('./order-detail');
const user          = require('./user');

app.use('/attachment', attachment);
app.use('/categories', category);
app.use('/favorites', favorite);
app.use('/items', item);
app.use('/oauth', oauth);
app.use('/orders', order);
app.use('/users', user);
app.use('/cart', cart);
app.use('/events', event);
app.use('/order-details', orderDetail);

app.use((req, res, next) => {
  const err = new APIError({ status: 404, message: 'endpoint_not_found' });
  next(err);
})

app.use((err, req, res, next) => {
  return res.json({
    status: err.status || 500,
    message: err.message || '',
    errors: err.errors || [],
  });
})