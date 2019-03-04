const mongoose = require('mongoose');

const Occassion = new mongoose.Schema({
   name: String,
   description: String,
   createdAt: Number,
   updatedAt: Number,
});

module.exports = Occassion;
