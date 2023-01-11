const cartService = require("../services/cartService");
const { asyncErrorHandler } = require("../utils/error");

const cartList = asyncErrorHandler(async (req, res) => {
  const list = await cartService.cartList(req.userId);

  return res.status(201).json({ data: list });
});

const addCart = asyncErrorHandler(async (req, res) => {
  const { productId } = req.body;

  await cartService.addCart(req.userId, productId);

  return res.status(201).json({ message: "updateCart" });
});

const changeQuantity = asyncErrorHandler(async (req, res) => {
  const { cartId } = req.body;
  const { quantity } = req.body;

  await cartService.changeQuantity(req.userId, cartId, quantity);

  const list = await cartService.cartList(req.userId);

  return res.status(201).json({ data: list });
});

const deleteCart = asyncErrorHandler(async (req, res) => {
  const { cartId } = req.query;

  await cartService.deleteCart(cartId);

  return res.status(201).json({ message: "CartDeleted" });
});

module.exports = {
  cartList,
  addCart,
  changeQuantity,
  deleteCart,
};
