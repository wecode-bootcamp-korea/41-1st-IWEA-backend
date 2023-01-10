const { appDataSource } = require("./appDataSource");

const productsList = async (categoryId, sort, offset, limit) => {
  let whereClause = categoryId ? `WHERE category_id = ${categoryId}` : ``;

  const sortMethod = Object.freeze({
    cheap: "p.price ASC",
    expensive: "p.price DESC",
    new: "p.created_at DESC",
    old: "p.created_at ASC",
    nameASC: "p.korean_name ASC",
    nameDESC: "p.korean_name DESC",
  });

  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const productsList = await queryRunner.query(
      `SELECT SQL_CALC_FOUND_ROWS
        p.id AS productId,
        p.korean_name AS koreanName,
        p.english_name AS englishName,
        p.price,
        p.thumbnail
      FROM products p
      ${whereClause}
      ORDER BY ${sortMethod[sort]}
      LIMIT ${limit} OFFSET ${offset}`
    );

    const [totalCount] = await queryRunner.query(
      `SELECT FOUND_ROWS() AS totalCount`
    );

    return { productsList, totalCount };
  } catch (err) {
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
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
  productsList,
  productDetails,
};
