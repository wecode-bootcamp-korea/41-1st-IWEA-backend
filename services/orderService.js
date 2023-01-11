const userDao = require("../models/userDao");
const orderDao = require("../models/orderDao");
const { throwCustomError } = require("../utils/error");

const createOrder = async (userId, cartId, products, totalPrice) => {
  const userInfo = await userDao.userInfo(userId);

  if (userInfo.points - totalPrice < 0)
    throwCustomError("NOT_ENOUGH_POINTS!", 400);

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
