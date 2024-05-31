import { db } from "../db";
import { getCreateOrderProductsQuery } from "../helpers";

export interface IOrderProduct {
  order_product_id: string;
  order_id: string;
  product_id: string;
  quantity: number;
}

export class OrderProduct {
  async create(orderProduct: IOrderProduct): Promise<IOrderProduct | null> {
    try {
      const sql =
        "INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *";
      const conn = await db.connect();

      const result = await conn.query(sql, [
        orderProduct.order_id,
        orderProduct.product_id,
        orderProduct.quantity,
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add new order product [${orderProduct.product_id}] in order [${orderProduct.order_id}]. Error: ${err}`
      );
    }
  }

  async createMany(
    orderProducts: IOrderProduct[]
  ): Promise<IOrderProduct | null> {
    try {
      const { query, values } = getCreateOrderProductsQuery(orderProducts);
      const conn = await db.connect();

      const result = await conn.query(query, values);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add new order products [${orderProducts
          .map((p) => p.product_id)
          .join()}]. Error: ${err}`
      );
    }
  }
}
