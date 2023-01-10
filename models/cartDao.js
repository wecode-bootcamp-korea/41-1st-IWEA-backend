const { appDataSource } = require("./appDataSource");

const cartList = async (userId) => {
  try {
    const [list] = await appDataSource.query(
      `SELECT
        u.points AS userPoints,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'cartId', c.id,
            'productId', p.id,
            'thumbnail', p.thumbnail,
            'koreanName', p.korean_name,
            'englishName', p.english_name,
            'eachPrice', p.price,
            'quantity', c.quantity
          )
        ) AS cartList
      FROM 
        carts c
      INNER JOIN products p ON p.id = c.product_id
      INNER JOIN users u ON u.id = c.user_id
      WHERE 
        c.user_id = ?`,
      [userId]
    );
    return list;
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
