const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Favorite = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    } 
});

module.exports = Favorite;
