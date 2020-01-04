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

  let numberOfCombinedOrder = 1;
  if(typeof data.numberOfCombinedOrder !== 'undefined') {
    numberOfCombinedOrder = data.numberOfCombinedOrder;
    delete data.numberOfCombinedOrder;
  }

  const { error } = validateCartInput(data);
  if (error) {
    return apiResponse.badRequest(res, { data: error });
  }

  try {
    const cart = await Cart.findOne({ user: data.user, item: data.item }).select('_id');

    if(cart) {
      return apiResponse.badRequest(res, { message: "item_exists_in_cart" });
    }

    const userCart = await Cart.find({ user: data.user })
      .select({ item: 1, quantity: 1, price: 1 })
      .populate('item');
  
    const event = await Event.findOne({ _id: data.event })
      .select({ status: 1, priceLimit: 1 });

    const item = await Item.findOne({ _id: data.item }).select('price'),
      currentItemPrice = item.price * data.quantity,
      priceLimit = event.priceLimit;

    if(numberOfCombinedOrder > 1) {
      let calculatedPrice = currentItemPrice;
      let totalQuantity = data.quantity;
      if(userCart.length) {
        for(i = 0; i < userCart.length; i++) {
          totalQuantity += userCart[i].quantity;
          calculatedPrice += userCart[i].item.price * userCart.quantity;
        }
      }

      if(totalQuantity > numberOfCombinedOrder) {
        return apiResponse.badRequest(res, { message: "quantity_greater_than_combined_orders" });
      }

      if(calculatedPrice > priceLimit * numberOfCombinedOrder) {
        return apiResponse.badRequest(res, { message: "price_limit_exceeded" });
      }

    } else if(userCart.length) {
      return apiResponse.badRequest(res, { message: "can_add_only_one_item" });
    } else if(currentItemPrice > priceLimit) {
      return apiResponse.badRequest(res, { message: "price_limit_exceeded" });
    }
    
    const doc = new Cart(data);
    const newCart = await doc.save();
    return apiResponse.success(res, { message: "added_cart", data: newCart });
  } catch (e) {
    return apiResponse.serverError(res, { data: e.message });
  }
};