const Cart = require("@models/cart");
const Item = require("@models/item");
const Event = require("@models/event");
const validateCartInput = require("@validations/cart/validate-input");

exports.create = async (req, res) => {
  const data = req.body;

  if(typeof data.user === 'undefined') {
    data['user'] = req.userId
  }
  
  if(typeof data.quantity === 'undefined') {
    data['quantity'] = 1;
  }

  const { error } = validateCartInput(data);
  if (error) {
    return apiResponse.badRequest(res, { data: error });
  }

  try {
    const cart = await Cart.find({ user: data.user })
      .select({ item: 1, quantity: 1 })
      .populate('item');
  
    //TODO checking for events and combined orders
    // const event = await Event.findOne({ _id: data.event })
    //   .select({ status: 1, priceLimit: 1 });

    // const item = await Item.findOne({ _id: data.item }).select('price'),
    //   currentItemPrice = item.price,
    //   priceLimit = event.priceLimit;

    // const numberOfCombinedOrder = data.numberOfCombinedOrder;
    // if(numberOfCombinedOrder > 1) {
    //   let calculatedPrice = currentItemPrice;
    //   if(cart.length) {
    //     for(i = 0; i < cart.length; i++) {
    //       calculatedPrice += cart.item.price;
    //     }
    //   }

    //   if(calculatedPrice > priceLimit * numberOfCombinedOrder) {
    //     return apiResponse.badRequest(res, { message: "price_limit_exceeded" });
    //   }

    // } else if(cart.length) {
    //   return apiResponse.badRequest(res, { message: "can_add_only_one_item" });
    // } else if(currentItemPrice > priceLimit) {
    //   return apiResponse.badRequest(res, { message: "price_limit_exceeded" });
    // }
    
    if(cart.length) {
      return apiResponse.badRequest(res, { message: "can_add_only_one_item" });
    } 

    const doc = new Cart(data);
    const newCart = await doc.save();
    return apiResponse.success(res, { message: "added_cart", data: newCart });
  } catch (e) {
    return apiResponse.serverError(res, { data: e.message });
  }
};