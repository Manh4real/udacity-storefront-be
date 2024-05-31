import { db } from "../db";
import { IOrderProduct, OrderProduct } from "./order_product";

export interface IOrder {
  order_id: string;
  user_id: string;
  status: "active" | "complete";
}

const orderProductModel = new OrderProduct();

export class Order {
  async create(userId: string, products: IOrderProduct[]) {
    try {
      const conn = await db.connect();

      const sql = "INSERT INTO orders (user_id) VALUES($1) RETURNING *";
      const order = await conn.query(sql, [userId]);

      const orderProducts = await orderProductModel.createMany(products);

      conn.release();

      return { order, orderProducts };
    } catch (err) {
      throw new Error(
        `Could not add new order of user ${userId}. Error: ${err}`
      );
    }
  }

  async showCurrentUserOrders(userId: string): Promise<IOrder[]> {
    try {
      const sql = "SELECT * FROM orders WHERE user_id = $1";
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

  async showCurrentUserCompletedOrders(userId: string): Promise<IOrder[]> {
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
