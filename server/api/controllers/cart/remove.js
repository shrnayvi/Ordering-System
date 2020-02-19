const Cart = require("@models/cart");

exports.removeById = async (req, res, next) => {
  try {
    const cart = await Cart.findOneAndRemove({ _id: req.params._id });
    return apiResponse.success(res, { message: "deleted_cart", data: cart });
  } catch (e) {
    return next(e);;
  }
};

exports.remove = async (req, res, next) => {
  try {
    const user = req.userId;
    const cart = await Cart.deleteMany({ user });
    return apiResponse.success(res, { message: "deleted_cart", data: cart });
  } catch (e) {
    return next(e);;
  }
};
