const { create, bulkCreate } = require("@services/cart");
const validateCartInput = require("@validations/cart/validate-input");

exports.create = async (req, res) => {
  const data = req.body;

  const { error } = validateCartInput(data);
  if (error) {
    return apiResponse.badRequest(res, { data: error });
  }

  try {
    if(!('user' in data)) {
      data['user'] = req.userId
    }
    const cart = await create(data);
    return apiResponse.success(res, { message: "added_cart", data: cart });
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
    const carts = await bulkCreate(data);
    return apiResponse.success(res, { message: "added_cart", data: carts });
  } catch (e) {
    return apiResponse.serverError(res, { data: e.message });
  }
};
