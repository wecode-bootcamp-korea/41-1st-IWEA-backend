const productService = require("../services/productService");

const productsList = async (req, res) => {
  try {
    const productsList = await productService.productsList(req.query);

    return res.status(200).json({ data: productsList });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const productDetails = async (req, res) => {
  try {
    const { productId } = req.params;

    const productDetails = await productService.productDetails(productId);

    return res.status(200).json({ data: productDetails });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  productsList,
  productDetails,
};
