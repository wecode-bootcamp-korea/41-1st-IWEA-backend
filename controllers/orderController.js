const orderService = require("../services/orderService");

const createOrder = async (req, res) => {
  const { cartId, productId, quantity, totalPrice } = req.body;
  // const { products } = req.body;

  await orderService.createOrder(
    req.userId,
    cartId,
    productId,
    quantity,
    totalPrice
  );
  return res.status(201).json({ message: "Order Success!" });
};

const getOrder = async (req, res) => {
  try {
    const list = await orderService.getOrder(req.userId);

    return res.status(201).json({ data: list });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const cancelOrder = async (req, res) => {
  const { totalPrice } = req.body;
  const { orderId } = req.body;

  await orderService.cancelOrder(req.userId, totalPrice, orderId);
  return res.status(200).json({ message: "Cancel Success!" });
};

module.exports = {
  createOrder,
  getOrder,
  cancelOrder,
};
