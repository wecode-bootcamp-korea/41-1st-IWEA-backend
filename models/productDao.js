const { appDataSource } = require("./appDataSource");

const totalCount = async (categoryString) => {
  try {
    return await appDataSource.query(
      `SELECT
        count(id) AS cnt
      FROM
        products
      ${categoryString}
      `
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Fail to count!");
    error.statusCode = 500;
  }
};

const productsList = async (categoryString, orderByString, limitString) => {
  try {
    const productsList = await appDataSource.query(
      `SELECT
        COUNT(id) AS cnt,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'productId', id,
            'koreanName', korean_name,
            'englishName', english_name,
            'price', price,
            'thumbnail', thumbnail
          )
        ) AS productDetail
      FROM products
      ${categoryString}
      ORDER BY ${orderByString}
      ${limitString};`
    );
    return productsList;
  } catch (err) {
    console.log(err);
    const error = new Error("Fail to load products list");
    error.statusCode = 500;
  }
};

const productDetails = async (productId) => {
  try {
    const [details] = await appDataSource.query(
      `SELECT
        p.id,
        p.korean_name,
        p.english_name,
        p.short_description,
        p.long_description,
        p.price,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'url', i.image_url
          )
        ) AS image_url
      FROM 
        products AS p
      LEFT JOIN 
        product_images AS i 
      ON 
        p.id = i.product_id
      WHERE p.id = ?
      GROUP BY p.id;
      `,
      [productId]
    );
    return details;
  } catch (err) {
    console.log(err);
    const error = new Error("Fail to load details of products");
    error.statusCode = 500;
  }
};

module.exports = {
  totalCount,
  productsList,
  productDetails,
};
