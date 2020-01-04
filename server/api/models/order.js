const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * statuses: { pending; -1, cancelled: 0, confirmed: 1, delivered: 2 }
 */
const OrderSchema = new Schema({
  orderNumber: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: Number,
    enum: [-1, 0, 1, 2],
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
  },
  // item: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Item',
  // },
  // quantity: Number,
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);