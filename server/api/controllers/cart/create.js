const Cart = require("@models/cart");
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
    const cart = await Cart.findOne({ user: data.user, item: data.item });
    if(cart) {
      return apiResponse.badRequest(res, { message: "item_exists_in_cart" });
    }

    const doc = new Cart(data);
    const newCart = await doc.save();
    return apiResponse.success(res, { message: "added_cart", data: newCart });
  } catch (e) {
    return apiResponse.serverError(res, { data: e.message });
  }
};

exports.bulkCreate = async (req, res) => {
  const data = req.body;

  const { error } = validateCartInput(data);
  if (error) {
    return apiResponse.badRequest(res, { data: error });
  }
  try {
    for(let i = 0, length = data.length; i < length; i++) {
      if(typeof data[i].user === 'undefined') {
        data[i]['user'] = req.userId;
      }
    }
    const carts = await Cart.insertMany(data);
    return apiResponse.success(res, { message: "added_cart", data: carts });
  } catch (e) {
    return apiResponse.serverError(res, { data: e.message });
  }
};