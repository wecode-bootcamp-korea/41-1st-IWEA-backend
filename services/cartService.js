const cartDao = require("../models/cartDao");

const cartList = async (userId) => {
  return await cartDao.cartList(userId);
};

const addCartInDetailPage = async (userId, productId) => {
  const cartCheck = await cartDao.cartCheck(userId, productId);

  if (!cartCheck) {
    await cartDao.addNewProductInCart(userId, productId);
    return "addNewProductInCart";
  }

  if (cartCheck) {
    await cartDao.plusOneQuantity(userId, productId);
    return "plusOneQuantity";
  }
};

const changeQuantity = async (userId, productId, quantity) => {
  return await cartDao.changeQuantity(userId, productId, quantity);
};

const deleteOne = async (userId, productId) => {
  return await cartDao.deleteOne(userId, productId);
};

const deleteAll = async (userId) => {
  return await cartDao.deleteAll(userId);
};

module.exports = {
  cartList,
  addCartInDetailPage,
  changeQuantity,
  deleteOne,
  deleteAll,
};
