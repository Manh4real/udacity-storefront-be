import { db } from "../db";
import { IOrderProduct, OrderProduct } from "./order_product";

export interface IOrder {
  order_id: string;
  user_id: string;
  status: "active" | "complete";
}

const orderProductModel = new OrderProduct();

export class Order {
  async create(userId: string, products: Omit<IOrderProduct, "order_id">[]) {
    try {
      const conn = await db.connect();

      const sql = "INSERT INTO orders (user_id) VALUES($1) RETURNING *";
      const createOrderResult = await conn.query(sql, [userId]);
      const order: IOrder = createOrderResult.rows[0];

      const orderProducts = await orderProductModel.createMany(
        products.map((p) => ({
          ...p,
          order_id: order.order_id,
        }))
      );

      conn.release();

      return { order: order, orderProducts };
    } catch (err) {
      throw new Error(
        `Could not add new order of user ${userId}. Error: ${err}`
      );
    }
  }

  async updateToCompleted(orderId: string): Promise<boolean> {
    try {
      const conn = await db.connect();

      const sql = "UPDATE orders SET status = 'complete' WHERE order_id = $1";
      const result = await conn.query(sql, [orderId]);

      conn.release();

      return true;
    } catch (err) {
      throw new Error(
        `Could not update order [${orderId}] status to completed. Error ${err}`
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
        "SELECT * FROM orders WHERE user_id = $1 AND status = 'complete'";
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
