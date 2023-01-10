const userDao = require("../models/userDao");
const orderDao = require("../models/orderDao");

const createOrder = async (userId, cartId, products, totalPrice) => {
  const userInfo = await userDao.userInfo(userId);

  if (userInfo.points - totalPrice < 0) {
    const error = new Error("Not_Enough_Points!");
    error.statusCode = 400;

    throw error;
  }

  const orderId = await orderDao.createOrder(
    userId,
    cartId,
    products,
    totalPrice
  );

  return orderId;
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
