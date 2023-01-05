const express = require("express");

const router = express.Router();

const cartController = require("../controllers/cartController");
const { validateToken } = require("../utils/auth");

router.get("", validateToken, cartController.cartList);
router.post(
  "/productId/:productId",
  validateToken,
  cartController.addCartInDetailPage
);
router.patch(
  "/productId/:productId",
  validateToken,
  cartController.changeQuantity
);
router.delete("/productId/:productId", validateToken, cartController.deleteOne);
router.delete("", validateToken, cartController.deleteAll);

module.exports = {
  router,
};
