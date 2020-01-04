const Order = require("@models/order");
const OrderDetail = require("@models/order-detail");
const Cart = require("@models/cart");
const Item = require("@models/item");
const Event = require("@models/event");
const validateCreate = require("@validations/order/create");
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
      if(typeof orders[i].quantity === 'undefined' || !orders[i].quantity) {
        orders[i].quantity = 1;
      }

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
      
    const rand = randomString(10);
    orderNumber = `${rand}${(data.event || '').substring(3, 8)}`;

    const order = new Order({ 
      orderNumber,
      user: req.userId,
      event: data.event,
    });

    const newOrder = await order.save();

    let details = orders.map(detail => ({ ...detail, order: order._id }));
    await OrderDetail.insertMany(details);

    await Cart.deleteMany({ user: req.userId });

    return apiResponse.success(res, { message: "added_order", data: newOrder });
  } catch (e) {
    console.log(e)
    return apiResponse.serverError(res, { data: e.message });
  }
}