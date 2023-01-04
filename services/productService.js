const productDao = require("../models/productDao");

const allProducts = async () => {
  const results = await productDao.allProducts();
  return results;
};

const productsOfCategoryList = async (categoryId) => {
  const results = await productDao.productsOfCategoryList(categoryId);
  return results;
};

const productDetails = async (productId) => {
  const details = await productDao.productDetails(productId);
  return details;
};

module.exports = {
  allProducts,
  productsOfCategoryList,
  productDetails,
};
