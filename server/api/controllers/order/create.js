const { get: _get } = require('lodash');
const Order = require("@models/order");
const Cart = require("@models/cart");
const Item = require("@models/item");
const Event = require("@models/event");
const validateCreate = require("@validations/order/create");
// const validateBulkCreate = require("@validations/order/bulk-create");
const randomString = require("@utils/random-string");

exports.create = async (req, res) => {
  try {
    const data = req.body;
    const numberOfCombinedOrder = data.numberOfCombinedOrder || 1;
    let orders = data.orders;
    
    if(typeof orders === 'undefined') {
      orders = [{}];
    }

    if(!Array.isArray(orders)) {
      orders = [orders];
    }

    let totalQuantity = 0;
    let totalPrice = 0;
    for(let i = 0; i < orders.length; i++) {
      const item = orders[i].item || null;
      orders[i].user = req.userId;
      orders[i].event = data.event;

      if(typeof orders[i].quantity === 'undefined' || !orders[i].quantity) {
        orders[i].quantity = 1;
      }

      if(typeof orders[i].status === 'undefined') {
        orders[i].status = -1;
      }

       
      rand = randomString(10);
      orderNumber = `${rand}${(item || '').substring(3, 8)}`;
      orders[i].orderNumber = orderNumber;
      const foundItem = await Item.find({ _id: item }).select('price');
      totalQuantity += orders[i].quantity;
      totalPrice += orders[i].quantity * foundItem.price;
    }

    const { error } = validateCreate({
      event: data.event,
      orders,
    });

    if (error) {
      return apiResponse.badRequest(res, { data: error });
    }

    const event = await Event.find({ _id: data.event }).select('priceLimit');
    if(totalQuantity > numberOfCombinedOrder) {
      return apiResponse.badRequest(res, { message: 'order_exceeded' });
    }

    if(totalPrice > event.priceLimit * numberOfCombinedOrder) {
      return apiResponse.badRequest(res, { message: 'price_exceeded' })    
    }

    const newOrder = await Order.insertMany(data.orders);
    await Cart.deleteMany({ user: req.userId });

    return apiResponse.success(res, { message: "added_order", data: newOrder });
  } catch (e) {
    console.log(e);
    return apiResponse.serverError(res, { data: e.message });
  }
}