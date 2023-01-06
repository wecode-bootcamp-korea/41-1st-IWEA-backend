const { appDataSource } = require("./appDataSource");

const productsList = async (categoryString, orderByString) => {
  try {
    const productsList = await appDataSource.query(
      `SELECT
        id,
        korean_name,
        english_name,
        price,
        thumbnail
      FROM
        products
      ${categoryString}
      ORDER BY ${orderByString};`
    );
    return productsList;
  } catch (err) {
    console.log(err);
    const error = new Error("Can't load all products list");
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
    const error = new Error("Can't load details of products");
    error.statusCode = 500;
  }
};

module.exports = {
  productsList,
  // productsOfCategoryList,
  productDetails,
};
