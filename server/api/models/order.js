const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * statuses: { pending; -1, cancelled: 0, confirmed: 1, delivered: 2 }
 */
const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: 'Item',
  },
  status: {
    type: Number,
    enum: [-1, 0, 1, 2],
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
  },
  quantity: Number,
  orderNumber: String,
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);