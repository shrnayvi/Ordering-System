const mongoose = require('mongoose');
const orderSchema =  require('@server/models/order');
const Order = mongoose.model('Order', orderSchema);

module.exports = {
    model: Order,

    get: (query, single) => { 
        if(single) {
            return Order.findOne(query);
        } else {
            return Order.find(query);
        }
    },
    create: (data) => {
        let order= new Order(data);
        return order.save();
    },

    update: (query, data) => {
        return Order.findOneAndUpdate(query, data, { new: true });
    },

    delete: (query) => {
        return Order.findOneAndRemove(query);
    },
}