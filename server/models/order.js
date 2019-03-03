const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
    },
    occassion: {
        type: Schema.Types.ObjectId,
        ref: 'Occasssion'
    },
});

module.exports = Order;
