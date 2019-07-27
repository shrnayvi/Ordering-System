const Order = require('@server/models/order');

module.exports = {
  get: (query, single = true) => {
    if (single) {
      return Order.findOne(query);
    }
    return Order.find(query);
  },

  create: (data) => {
    let order = new Order(data);
    return order.save();
  },

  bulkCreate: (data) => {
    return Order.insertMany(data);
  },

  update: (query, data) => {
    return Order.findOneAndUpdate(query, data, { new: true });
  },

  remove: (query) => {
    return Order.findOneAndRemove(query);
  },
}