import { db } from "../db";
import { IOrder } from "../models/order";
import { IOrderProduct } from "../models/order_product";

type IFullOrderProduct = IOrder & IOrderProduct;

export class MiscService {
  async getFullInfoOfCurrentUserOrders(
    userId: string
  ): Promise<IFullOrderProduct[]> {
    console.log("??");
    try {
      const conn = await db.connect();
      const sql = "SELECT * FROM orders WHERE user_id = $1";

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
      const sql =
        "SELECT * FROM orders WHERE user_id = $1 AND status = 'completed'";
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
