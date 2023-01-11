const productService = require("../services/productService");
const { asyncErrorHandler } = require("../utils/error");

const productsList = asyncErrorHandler(async (req, res) => {
  const queryParams = req.query;

  const { productsList, totalCount } = await productService.productsList(
    queryParams
  );

  return res.status(200).json({ total: totalCount, data: productsList });
});

const productDetails = asyncErrorHandler(async (req, res) => {
  const { productId } = req.params;

  const productDetails = await productService.productDetails(productId);

  return res.status(200).json({ data: productDetails });
});

module.exports = {
  productsList,
  productDetails,
};
