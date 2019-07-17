const Cart = require("@server/models/cart");

module.exports = {
  get: (query, single = true) => {
    if (single) {
      return Cart.findOne(query);
    }

    return Cart.find(query);
  },

  create: data => {
    let cart = new Cart(data);
    return cart.save();
  },

  bulkCreate: data => {
    return Cart.insertMany(data)
  },

  remove: (query, single = true) => {
    if(single) {
      return Cart.findOneAndRemove(query);
    } 
    return Cart.remove(query);

  },
};
