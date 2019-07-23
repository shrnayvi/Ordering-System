const { create, bulkCreate } = require("@services/cart");
const validateCartInput = require("@validations/cart/validate-input");

exports.create = async (req, res) => {
  const data = req.body;

  const { error } = validateCartInput(data);
  if (error) {
    return apiResponse.badRequest(res, { data: error });
  }

  try {
    if(typeof data.user === 'undefined') {
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
    for(let i = 0, length = data.length; i < length; i++) {
      if(typeof data[i].user === 'undefined') {
        data[i]['user'] = req.userId;
      }
    }
    const carts = await bulkCreate(data);
    return apiResponse.success(res, { message: "added_cart", data: carts });
  } catch (e) {
    return apiResponse.serverError(res, { data: e.message });
  }
};
