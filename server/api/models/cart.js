const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: 'Item',
  },
  event: {
    type: mongoose.Types.ObjectId,
    ref: 'Event',
  },
  quantity: Number,
  numberOfCombinedOrder: Number,
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);