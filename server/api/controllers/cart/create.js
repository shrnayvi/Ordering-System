const Cart = require("@models/cart");
const Item = require("@models/item");
const validateCartInput = require("@validations/cart/validate-input");

exports.create = async (req, res, next) => {
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
    apiResponse.badRequest({ data: error });
  }

  try {
    const item = await Item.findOne({ _id: data.item }).select('price');
    if(!item) {
      apiResponse.notFound({ message: 'item_not_found' });
    }

    const cart = await Cart.findOne({ user: data.user, item: data.item }).select('_id');

    if(cart) {
      apiResponse.badRequest({ message: "item_exists_in_cart" });
    }
    
    const doc = new Cart(data);
    const newCart = await doc.save();
    return apiResponse.success(res, { message: "added_cart", data: newCart });
  } catch (e) {
    return next(e);;
  }
};