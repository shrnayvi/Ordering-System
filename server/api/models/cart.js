const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  event: {
    type: mongoose.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  quantity: Number,
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);