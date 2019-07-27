const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: 'Item'
  },
  quantity: Number
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);