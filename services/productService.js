const productDao = require("../models/productDao");

const productsList = async ({
  category,
  sort = "old",
  offset = 0,
  limit = 12,
}) => {
  return await productDao.productsList(category, sort, offset, limit);
};

const productDetails = async (productId) => {
  const details = await productDao.productDetails(productId);
  return details;
};

module.exports = {
  productsList,
  productDetails,
};
