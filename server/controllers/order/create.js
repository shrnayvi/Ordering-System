const { create } = require("@services/order");
const validateOrder = require("@validations/order/create");
const randomstring = require("randomstring");

module.exports = async (req, res) => {
  try {
    let {
      user,
      item,
      status,
      quantity,
    } = req.body;

    if (!user) {
      user = req.userId;
    }

    if(!quantity) {
      quantity = 1;
    }

    if (typeof status === "undefined") {
      status = -1;
    }

    const rand = randomstring.generate(10);
    const orderNumber = `${rand}${item.substring(3, 8)}`;
    let data = {
      user,
      item,
      status,
      orderNumber
    };

    const { error } = validateOrder(data);
    if (error) {
      return apiResponse.badRequest(res, { data: error });
    }

    const newOrder = await create(data);
    return apiResponse.success(res, { message: "added_order", data: newOrder });
  } catch (e) {
    return apiResponse.serverError(res, { data: e.message });
  }
};
