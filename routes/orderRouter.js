const express = require("express");

const router = express.Router();

const orderController = require("../controllers/orderController");
const { validateToken } = require("../utils/auth");

router.post("", validateToken, orderController.addOrder);
router.get("", validateToken, orderController.orderList);
router.patch("", validateToken, orderController.cancelOrder);

module.exports = {
  router,
};
