const { remove } = require("@services/cart");

exports.removeById = async (req, res) => {
  try {
    const cart = await remove({ _id: req.params._id });
    return apiResponse.success(res, { message: "deleted_cart", data: cart });
  } catch (e) {
    return apiResponse.serverError(res, { data: e.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const user = req.userId;
    const cart = await remove({ user }, false);
    return apiResponse.success(res, { message: "deleted_cart", data: cart });
  } catch (e) {
    return apiResponse.serverError(res, { data: e.message });
  }
};
