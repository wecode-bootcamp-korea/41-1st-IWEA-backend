const express = require("express");

const router = express.Router();

const orderController = require("../controllers/orderController");
const { validateToken } = require("../utils/auth");

router.post("", validateToken, orderController.createOrder);
router.get("", validateToken, orderController.getOrder);
router.patch("", validateToken, orderController.cancelOrder);

module.exports = {
  router,
};
