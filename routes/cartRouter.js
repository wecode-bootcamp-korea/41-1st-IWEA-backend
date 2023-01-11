const express = require("express");

const router = express.Router();

const cartController = require("../controllers/cartController");
const { validateToken } = require("../utils/auth");

router.get("", validateToken, cartController.cartList);
router.post("", validateToken, cartController.createCart);
router.patch("", validateToken, cartController.changeQuantity);
router.delete("", validateToken, cartController.deleteCart);

module.exports = {
  router,
};
