const { Schema, model } = require('mongoose');

const OrderDetailSchema= new Schema({
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  price: Number,
}, { timestamps: true });

module.exports = model('OrderDetail', OrderDetailSchema);