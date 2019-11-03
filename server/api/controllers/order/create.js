const Order = require("@models/order");
const Cart = require("@models/cart");
const validateCreate = require("@validations/order/create");
const validateBulkCreate = require("@validations/order/bulk-create");
const randomString = require("@utils/random-string");

exports.create = async (req, res) => {
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

    const rand = randomString(10);
    const orderNumber = `${rand}${item.substring(3, 8)}`;
    let data = {
      user,
      item,
      status,
      orderNumber
    };

    const { error } = validateCreate(data);
    if (error) {
      return apiResponse.badRequest(res, { data: error });
    }

    const doc = new Order(data);
    const newOrder = await doc.save();
    return apiResponse.success(res, { message: "added_order", data: newOrder });
  } catch (e) {
    return apiResponse.serverError(res, { data: e.message });
  }
};

exports.bulkCreate = async (req, res) => {
  let data = req.body;
  let rand, orderNumber;
  data.forEach(ord => {
    if(typeof ord.user === 'undefined') {
      ord['user'] = req.userId;
    }

    if(typeof ord.quantity === 'undefined' || !ord.quantity) {
      ord['quantity'] = 1;
    }

    if(typeof ord.status === 'undefined') {
      ord['status'] = -1;
    }
    
    rand = randomString(10);
    orderNumber = `${rand}${ord.item.substring(3, 8)}`;
    ord['orderNumber'] = orderNumber;
  });


  try {
    const { error } = validateBulkCreate(data);
    if (error) {
      return apiResponse.badRequest(res, { data: error });
    }

    const newOrder = await Order.insertMany(data);
    await Cart.deleteMany({ user: req.userId });
    return apiResponse.success(res, { message: "added_order", data: newOrder });
  } catch (e) {
    return apiResponse.serverError(res, { data: e.message });
  }
};