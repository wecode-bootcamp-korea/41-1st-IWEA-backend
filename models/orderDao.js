const { appDataSource } = require("./appDataSource");

// user points 찾는 쿼리
const userPoint = async (userId) => {
  const userPoints = await appDataSource.query(
    `SELECT
      points
    FROM
      users
    WHERE
      id =?
    `,
    [userId]
  );
  return userPoints;
};

const MoveToOrder = async (userId, cartId, totalPrice) => {
  try {
    // order 테이블에 결제 완료
    await appDataSource.query(
      `INSERT INTO
        orders (user_id, order_status_id)
      VALUES
        (?, 1);
      `,
      [userId]
    );

    // 포인트 차감
    await appDataSource.query(
      `UPDATE
        users
      SET
        points = points - ?
      WHERE
        id =?
      `,
      [totalPrice, userId]
    );

    // carts Table에 해당 유저의 장바구니 목록 비우기
    await appDataSource.query(
      `DELETE FROM
        carts
      WHERE
        carts.id IN (?);
      `,
      [cartId]
    );

    const lastInsertOrderId = await appDataSource.query(
      `SELECT LAST_INSERT_ID();`
    );

    return lastInsertOrderId[0]["LAST_INSERT_ID()"];
  } catch (err) {
    console.log(err);
    const error = new Error("Fail to add Order!");
    error.statusCode = 500;
  }
};

const updateOrderProduct = async (values, orderId, totalPrice) => {
  try {
    const query = `INSERT INTO
      order_product (order_id, product_id, quantity, order_status_id)
        VALUES ?;
  `;

    await appDataSource.query(query, [values]);

    // payment 테이블에 orderid, totalprice, methodid 넣기
    return await appDataSource.query(
      `INSERT INTO
        payments (order_id, total_price, methods)
      VALUES (?, ?, 1)
      `,
      [orderId, totalPrice]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Can't update product list in order");
    error.statusCode = 500;
  }
};

const orderList = async (userId) => {
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
        o.user_id = 7;
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
  try {
    //주문취소로 바꾸기
    await appDataSource.query(
      `UPDATE
        orders
      SET
        order_status_id = 7
      WHERE
       id = ?;
      `,
      [orderId]
    );
    // orders 테이블에서 삭제
    await appDataSource.query(
      `DELETE FROM
        orders
      WHERE
       orders.id IN (?)
      `,
      [orderId]
    );

    // users 테이블에서 user 포인트 반환 ^^
    return await appDataSource.query(
      `UPDATE
        users
      SET
        points = points + ?
      WHERE
        users.id = ?;
      `,
      [totalPrice, userId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Fail to cancle order!");
    error.statusCode = 500;
  }
};

module.exports = {
  userPoint,
  MoveToOrder,
  updateOrderProduct,
  orderList,
  cancelOrder,
};
