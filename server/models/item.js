const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema({
    name: String,
    description: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    } 
});

module.exports = Item;
