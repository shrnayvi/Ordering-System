const app = module.exports = require('express')();
const user = require('./user');

app.use('/user', user);

app.use('*', (req, res, next) => {
    res.send({ status: 404, messaege: 'Endpoint not found'});
})