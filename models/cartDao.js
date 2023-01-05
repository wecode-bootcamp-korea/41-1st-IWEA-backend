const { appDataSource } = require("./appDataSource");

const cartList = async (userId) => {
  try {
    return await appDataSource.query(
      `SELECT
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

const cartCheck = async (userId, productId) => {
  try {
    const [check] = await appDataSource.query(
      `SELECT
        id
      FROM
        carts
      WHERE 
        user_id = ? 
      AND 
        product_id = ?;`,
      [userId, productId]
    );
    return check;
  } catch (err) {
    console.log(err);
    const error = new Error("Can't check if this item is in cart");
    error.statusCode = 500;
  }
};

const addNewProductInCart = async (userId, productId) => {
  try {
    return await appDataSource.query(
      `INSERT INTO
        carts (user_id, product_id, quantity)
      VALUES (?, ?, 1);`,
      [userId, productId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Can't add the product in cart");
    error.statusCode = 500;
  }
};

const plusOneQuantity = async (userId, productId) => {
  try {
    return await appDataSource.query(
      `UPDATE 
        carts 
      SET 
        quantity = quantity + 1 
      WHERE 
        user_id = ? AND product_id = ?;`,
      [userId, productId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Can't plus one quantity");
    error.statusCode = 500;
  }
};

const changeQuantity = async (userId, productId, quantity) => {
  try {
    return await appDataSource.query(
      `UPDATE 
        carts
      SET 
        quantity = ? 
      WHERE 
        user_id = ? AND product_id = ?;
      `,
      [quantity, userId, productId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Can't change quantity of product!");
    error.statusCode = 500;
  }
};

const deleteOne = async (userId, productId) => {
  try {
    return await appDataSource.query(
      `DELETE FROM
        carts
      WHERE 
        user_id = ? AND product_id = ?;
      `,
      [userId, productId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Can't delete products from cart");
    error.statusCode = 500;
  }
};

const deleteAll = async (userId) => {
  try {
    return await appDataSource.query(
      `DELETE FROM
        carts
      WHERE user_id = ?;`,
      [userId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Can't delete products from cart");
    error.statusCode = 500;
  }
};

module.exports = {
  cartList,
  cartCheck,
  addNewProductInCart,
  plusOneQuantity,
  changeQuantity,
  deleteOne,
  deleteAll,
};
