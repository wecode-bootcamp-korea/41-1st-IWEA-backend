const { appDataSource } = require("./appDataSource");
const { throwCustomError } = require("../utils/error");

const OrderStatusId = Object.freeze({
  ORDER_DONE: 1,
  SHIPMENT_PROCESSING: 2,
  SHIPMENT_COMPLETED: 3,
  DELIVERY_START: 4,
  DELIVERY_COMPLETED: 5,
  PERCHASE_CONFIRMED: 6,
  ORDER_CANCELLED: 7,
  PAYMENT_ERROR: 8,
});

const PaymentMethodId = Object.freeze({
  USER_CREDIT: 1,
  CREDIT_CARD: 2,
  CASH: 3,
});

const createOrder = async (userId, cartId, products, totalPrice) => {
  if (!products.length) throwCustomError("NO_PRODUCTS", 400);

  const queryRunner = appDataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const createOrder = await queryRunner.query(
      `INSERT INTO
        orders (user_id, order_status_id)
      VALUES
        (${userId}, ${OrderStatusId.ORDER_DONE});
      `
    );

    const orderId = createOrder.insertId;

    await queryRunner.query(
      `DELETE FROM
        carts
      WHERE
        carts.id IN (?);
      `,
      [cartId]
    );

    await queryRunner.query(
      `UPDATE
          users
        SET
          points = points - ?
        WHERE
          id = ?
        `,
      [totalPrice, userId]
    );

    const query = `INSERT INTO
      order_product (order_id, product_id, quantity, order_status_id)
        VALUES ?;`;

    let values = [];
    for (let i = 0; i < products.length; i++) {
      values.push([
        orderId,
        products[i].productId,
        products[i].quantity,
        `${OrderStatusId.ORDER_DONE}`,
      ]);
    }

    await queryRunner.query(query, [values]);

    await queryRunner.query(
      `INSERT INTO
        payments (order_id, total_price, methods)
      VALUES (?, ?, ${PaymentMethodId.USER_CREDIT})
      `,
      [orderId, totalPrice]
    );

    await queryRunner.commitTransaction();
  } catch (err) {
    console.log(err);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};

const getOrder = async (userId) => {
  try {
    return await appDataSource.query(
      `SELECT
        o.id AS orderId,
        o.created_at AS orderedTime,
        s.status,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'totalPrice', pm.total_price,
            'productId', op.product_id,
            'thumbnail', pr.thumbnail,
            'name', pr.korean_name
          )
        ) AS products
      FROM
        orders o
      INNER JOIN payments pm ON o.id = pm.order_id
      INNER JOIN order_status s ON s.id = o.order_status_id
      INNER JOIN order_product op  ON op.order_id = o.id
      INNER JOIN products pr ON op.product_id = pr.id
      WHERE
        o.user_id = ?
	    GROUP BY o.id;
      `,
      [userId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Can't load order list");
    error.statusCode = 500;
  }
};

const cancelOrder = async (userId, totalPrice, orderId) => {
  const queryRunner = appDataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    await queryRunner.query(
      `UPDATE
        orders
      SET
        order_status_id = ${OrderStatusId.ORDER_CANCELLED}
      WHERE
       id = ?;
      `,
      [orderId]
    );

    await queryRunner.query(
      `UPDATE 
        users
      SET
        points = points + ?
      WHERE
        users.id = ?;
      `,
      [totalPrice, userId]
    );

    await queryRunner.commitTransaction();
  } catch (err) {
    console.log(err);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};

module.exports = {
  createOrder,
  getOrder,
  cancelOrder,
};
