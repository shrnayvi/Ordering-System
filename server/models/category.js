const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
    name: String,
    description: String,
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
   createdAt: Number,
   updatedAt: Number,
});

module.exports = Category;