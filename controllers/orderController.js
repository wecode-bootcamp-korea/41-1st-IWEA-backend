const orderService = require("../services/orderService");
const { asyncErrorHandler } = require("../utils/error");

const createOrder = asyncErrorHandler(async (req, res) => {
  const { cartId, products, totalPrice } = req.body;

  await orderService.createOrder(req.userId, cartId, products, totalPrice);
  return res.status(201).json({ message: "Order Success!" });
});

const getOrder = asyncErrorHandler(async (req, res) => {
  const list = await orderService.getOrder(req.userId);

  return res.status(200).json({ data: list });
});

const cancelOrder = asyncErrorHandler(async (req, res) => {
  const { totalPrice } = req.body;
  const { orderId } = req.body;

  await orderService.cancelOrder(req.userId, totalPrice, orderId);
  return res.status(200).json({ message: "Cancel Success!" });
});

module.exports = {
  createOrder,
  getOrder,
  cancelOrder,
};
