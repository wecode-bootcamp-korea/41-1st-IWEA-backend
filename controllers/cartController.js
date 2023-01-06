const cartService = require("../services/cartService");

const cartList = async (req, res) => {
  try {
    const list = await cartService.cartList(req.userId);

    return res.status(201).json({ data: list });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const addCart = async (req, res) => {
  try {
    const { productId } = req.body;

    await cartService.addCart(req.userId, productId);

    return res.status(201).json({ message: "updateCart" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const changeQuantity = async (req, res) => {
  try {
    const { cartId } = req.body;
    const { quantity } = req.body;

    await cartService.changeQuantity(req.userId, cartId, quantity);

    const list = await cartService.cartList(req.userId);

    return res.status(201).json({ data: list });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    const { cartId } = req.query;

    await cartService.deleteCart(cartId);

    return res.status(201).json({ message: "CartDeleted" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  cartList,
  addCart,
  changeQuantity,
  deleteCart,
};
