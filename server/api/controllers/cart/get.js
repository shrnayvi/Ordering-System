const Cart = require("@models/cart");

/**
 * Fetch the carts of loggedin user
 */
module.exports = async (req, res) => {
  try {
    const user = req.userId;
    const cart = await Cart.find({ user })
      .populate('item');
      
    return apiResponse.success(res, { message: "fetched_cart", data: cart });
  } catch (e) {
    return apiResponse.serverError(res, { data: e.message });
  }
};
