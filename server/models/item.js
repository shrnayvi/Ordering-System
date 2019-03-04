const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema({
    name: String,
    description: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
   createdAt: Number,
   updatedAt: Number,
});

module.exports = Item;
