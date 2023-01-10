const { appDataSource } = require("./appDataSource");

const queryRunner = appDataSource.createQueryRunner();

const OrderStatusId = Object.freeze({
  orderDone: 1,
  shipmentProcessing: 2,
  shipmentCompleted: 3,
  deliveryStart: 4,
  deliveryCompleted: 5,
  perchaseConfirmed: 6,
  orderCancelled: 7,
  paymentError: 8,
});

const paymentMethodId = Object.freeze({
  userCredit: 1,
  creditCard: 2,
  cash: 3,
});

const createOrder = async (userId, cartId, products, totalPrice) => {
  console.log("params", userId, cartId, products, totalPrice);

  if (!products.length) throw new Error("NO_PRODUCTS");

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    // order 테이블에 userId와 order_status_id(주문완료) 넣기
    await queryRunner.query(
      `INSERT INTO
        orders (user_id, order_status_id)
      VALUES
        (?, ${OrderStatusId.orderDone})
      `,
      [userId]
    );

    const [idData] = await queryRunner.query(`SELECT LAST_INSERT_ID();`);

    const orderId = idData["LAST_INSERT_ID()"];

    // carts에 있던 상품들 지워버리기
    await queryRunner.query(
      `DELETE FROM
        carts
      WHERE
        carts.id IN (?);
        `,
      [cartId]
    );

    // user 포인트 차감
    await queryRunner.query(
      `UPDATE
          users
        SET
          points = points - ?
        WHERE
          id =?
        `,
      [totalPrice, userId]
    );

    // order_product 테이블에 데이터 넣기
    const query = `INSERT INTO
      order_product (order_id, product_id, quantity, order_status_id)
        VALUES ?;`;

    let values = [];
    console.log("products", products);
    for (let i = 0; i < products.length; i++) {
      values.push([
        orderId,
        products[i].productId,
        products[i].quantity,
        `${OrderStatusId.orderDone}`,
      ]);
    }

    await queryRunner.query(query, [values]);

    // payment 테이블에 orderid, totalprice, methodid 넣기
    await queryRunner.query(
      `INSERT INTO
        payments (order_id, total_price, methods)
      VALUES (?, ?, ${paymentMethodId.userCredit})
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
        o.id,
        s.status,
        p.total_price
      FROM
        orders o
      INNER JOIN payments p ON o.id = p.order_id
      INNER JOIN order_status s ON s.id = o.order_status_id
      WHERE
        o.user_id = ?;
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
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    //주문취소로 바꾸기
    await queryRunner.query(
      `UPDATE
        orders
      SET
        order_status_id = ${OrderStatusId.orderCancelled}
      WHERE
       id = ?;
      `,
      [orderId]
    );
    // orders 테이블에서 삭제
    await queryRunner.query(
      `DELETE FROM
        orders
      WHERE
       orders.id IN (?)
      `,
      [orderId]
    );

    // users 테이블에서 user 포인트 반환 ^^
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
