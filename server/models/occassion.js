const mongoose = require('mongoose');

const Occassion = new mongoose.Schema({
    name: String,
    description: String
});

module.exports = Occassion;
