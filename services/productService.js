const productDao = require("../models/productDao");

const sortMethod = Object.freeze({
  cheap: "price ASC",
  expensive: "price DESC",
  new: "created_at DESC",
  old: "created_at ASC",
  nameASC: "korean_name ASC",
  nameDESC: "korean_name DESC",
});

const productsList = async ({ category, sort }) => {
  let orderByString = sortMethod[sort] ? sortMethod[sort] : sortMethod.old;

  let categoryId = category ? category : "";
  let categoryString = categoryId ? `WHERE category_id = ${categoryId}` : ``;

  return await productDao.productsList(categoryString, orderByString);
};

const productDetails = async (productId) => {
  const details = await productDao.productDetails(productId);
  return details;
};

module.exports = {
  productsList,
  productDetails,
};
