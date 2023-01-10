const orderDao = require("../models/orderDao");

const createOrder = async (userId, cartId, productId, quantity, totalPrice) => {
  const userPoint = await userDao.userPoint(userId);

  if (userPoint < totalPrice || totalPrice < 0) {
    const error = new Error("Not_Enough_Points!");
    error.statusCode = 400;

    throw error;
  }

  const orderId = await orderDao.MoveToOrder(userId, cartId, totalPrice);

  const values = [];
  for (let i = 0; i < productId.length; i++) {
    values.push([orderId, productId[i], quantity, 1]);
  }

  console.log("values", values);

  await orderDao.updateOrderProduct(values, orderId, totalPrice);

  // await cartDao.deleteCarts(cartIds)
};

const getOrder = async (userId) => {
  return await orderDao.getOrder(userId);
};

const cancelOrder = async (userId, totalPrice, orderId) => {
  return await orderDao.cancelOrder(userId, totalPrice, orderId);
};

module.exports = {
  createOrder,
  getOrder,
  cancelOrder,
};
