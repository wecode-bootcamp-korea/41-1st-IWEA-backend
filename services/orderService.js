const orderDao = require("../models/orderDao");

const addOrder = async (userId, cartId, productId, quantity, totalPrice) => {
  const userPoint = await orderDao.userPoint(userId);

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

  return await orderDao.updateOrderProduct(values, orderId, totalPrice);
};

const orderList = async (userId) => {
  return await orderDao.orderList(userId);
};

const cancelOrder = async (userId, totalPrice, orderId) => {
  return await orderDao.cancelOrder(userId, totalPrice, orderId);
};

module.exports = {
  addOrder,
  orderList,
  cancelOrder,
};
