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

const addCartInDetailPage = async (req, res) => {
  try {
    const { productId } = req.params;

    const cartCheck = await cartService.addCartInDetailPage(
      req.userId,
      productId
    );

    if (cartCheck == "addNewProductInCart") {
      return res.status(201).json({ message: "addNewProductInCart" });
    }
    if (cartCheck == "plusOneQuantity") {
      return res.status(201).json({ message: "plusOneQuantity" });
    }
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const changeQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    await cartService.changeQuantity(req.userId, productId, quantity);

    const list = await cartService.cartList(req.userId);

    return res.status(201).json({ data: list });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deleteOne = async (req, res) => {
  try {
    const { productId } = req.params;

    await cartService.deleteOne(req.userId, productId);

    const list = await cartService.cartList(req.userId);

    return res.status(201).json({ data: list });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deleteAll = async (req, res) => {
  try {
    await cartService.deleteAll(req.userId);

    return res.status(201).json({ message: "CartDeleted" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  cartList,
  addCartInDetailPage,
  changeQuantity,
  deleteOne,
  deleteAll,
};
