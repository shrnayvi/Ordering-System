const router = (module.exports = require("express").Router());

const authorize = require("@middlewares/authorize");
const checkToken = require("@middlewares/authenticate");
const cartController = require("@controllers/cart");

router.get(
  "/",
  [checkToken, authorize(cap["fetch_cart"])],
  cartController.create
);

router.post(
  "/",
  [checkToken, authorize(cap["add_cart"])],
  cartController.create
);

router.post(
  "/bulk-create",
  [checkToken, authorize(cap["add_cart"])],
  cartController.bulkCreate
);

router.delete(
  "/",
  [checkToken, authorize(cap["remove_cart"])],
  cartController.remove
);

router.delete(
  "/:_id",
  [checkToken, authorize(cap["remove_cart"])],
  cartController.removeById
);