const productDao = require("../models/productDao");

const sortMethod = Object.freeze({
  cheap: "price ASC",
  expensive: "price DESC",
  new: "created_at DESC",
  old: "created_at ASC",
  nameASC: "korean_name ASC",
  nameDESC: "korean_name DESC",
});

const productsList = async ({ category, sort, offset, limit }) => {
  let orderByString = sortMethod[sort] ? sortMethod[sort] : sortMethod.old;

  let categoryId = category ? category : "";
  let categoryString = categoryId ? `WHERE category_id = ${categoryId}` : ``;

  let start = 0;

  if (offset <= 0) {
    start = 1;
  } else {
    start = (offset - 1) * limit;
  }

  const totalCount = await productDao.totalCount(categoryString);

  if (offset > Math.round(totalCount[0].cnt / limit)) {
    return null;
  }

  let limitString = `LIMIT ${start}, ${limit}`;

  return await productDao.productsList(
    categoryString,
    orderByString,
    limitString
  );
};

const productDetails = async (productId) => {
  const details = await productDao.productDetails(productId);
  return details;
};

module.exports = {
  productsList,
  productDetails,
};
