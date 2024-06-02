import { db } from "../db";
import { IOrder } from "../models/order";
import { IOrderProduct } from "../models/order_product";

type IFullOrderProduct = IOrder & IOrderProduct;

export class MiscService {
  async getFullInfoOfCurrentUserOrders(
    userId: string
  ): Promise<IFullOrderProduct[]> {
    try {
      const conn = await db.connect();
      const sql = `
        SELECT *, (products.price * order_products.quantity) as total_price FROM orders
        INNER JOIN order_products ON orders.order_id = order_products.order_id
        INNER JOIN products ON order_products.product_id = products.product_id
        WHERE user_id = $1
      `;

      const result = await conn.query(sql, [userId]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get orders of user [${userId}]. Error: ${err}`
      );
    }
  }

  async getFullInfoOfCurrentUserCompletedOrders(
    userId: string
  ): Promise<IFullOrderProduct[] | null> {
    try {
      const sql = `SELECT *, (products.price * order_products.quantity) as total_price FROM orders
          INNER JOIN order_products ON orders.order_id = order_products.order_id
          INNER JOIN products ON order_products.product_id = products.product_id
          WHERE user_id = $1 AND status = 'complete'
        `;
      const conn = await db.connect();

      const result = await conn.query(sql, [userId]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get orders of user [${userId}]. Error: ${err}`
      );
    }
  }
}
