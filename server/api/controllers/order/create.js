const Order = require("@models/order");
const OrderDetail = require("@models/order-detail");
const Cart = require("@models/cart");
const Item = require("@models/item");
const Event = require("@models/event");
const validateCreate = require("@validations/order/create");
const randomString = require("@utils/random-string");

exports.create = async (req, res, next) => {
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

      const foundItem = await Item.findOne({ _id: item }).select('price');

      if(!foundItem) {
        apiResponse.notFound({ message: 'item_not_found', data: [{ item }] });
      }

      const quantity = orders[i].quantity;
      const price = quantity * foundItem.price;

      orders[i].price = price;
      totalQuantity += quantity;
      totalPrice += price;
    }

    const { error } = validateCreate({
      event: data.event,
      orders,
    });

    if (error) {
      apiResponse.badRequest({ data: error });
    }


    const event = await Event.findOne({ _id: data.event })
      .select({ status: 1, priceLimit: 1 });

    if(event.status !== 1) {
      apiResponse.badRequest({ message: 'event_closed' });
    }

    if(totalQuantity > numberOfCombinedOrder) {
      apiResponse.badRequest({ message: 'order_exceeded' });
    }

    if(totalPrice > event.priceLimit * numberOfCombinedOrder) {
      apiResponse.badRequest({ message: 'price_exceeded' })    
    }
      
    const rand = randomString(10);
    orderNumber = `${rand}${(data.event || '').substring(3, 8)}`;

    const order = new Order({ 
      orderNumber,
      user: req.userId,
      event: data.event,
      totalPrice,
      totalQuantity,
    });

    const newOrder = await order.save();

    let details = orders.map(detail => ({ ...detail, order: order._id }));
    await OrderDetail.insertMany(details);

    await Cart.deleteMany({ user: req.userId });

    return apiResponse.success(res, { message: "added_order", data: newOrder });
  } catch (e) {
    return next(e);;;
  }
}