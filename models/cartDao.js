const { appDataSource } = require("./appDataSource");

const cartList = async (userId) => {
  try {
    return await appDataSource.query(
      `SELECT
        c.id AS cartId,
        p.thumbnail,
        p.korean_name,
        p.english_name,
        p.price AS eachPrice,
        c.quantity
      FROM 
        carts c
      INNER JOIN products p ON p.id = c.product_id
      WHERE 
        c.user_id = ?;`,
      [userId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Can't load cart list");
    error.statusCode = 500;
  }
};

const addCart = async (userId, productId) => {
  try {
    return await appDataSource.query(
      `INSERT INTO
        carts (user_id, product_id, quantity) 
      VALUES (?, ?, 1)
      ON DUPLICATE KEY UPDATE
       user_id = ?, product_id = ?, quantity = quantity + 1;`,
      [userId, productId, userId, productId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Can't add product in cart!");
    error.statusCode = 500;
  }
};

const changeQuantity = async (userId, cartId, quantity) => {
  try {
    return await appDataSource.query(
      `UPDATE 
        carts
      SET 
        quantity = ? 
      WHERE 
        id = ? AND user_id = ?
      `,
      [quantity, cartId, userId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Can't change quantity of product!");
    error.statusCode = 500;
  }
};

const deleteCart = async (cartId) => {
  try {
    await appDataSource.query(
      `DELETE FROM
        carts
      WHERE
        carts.id IN (?);
      `,
      [cartId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Can't delete cart!");
    error.statusCode = 500;
  }
};

module.exports = {
  cartList,
  addCart,
  changeQuantity,
  deleteCart,
};
