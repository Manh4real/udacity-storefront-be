import { db } from "../db";

interface IProduct {
  product_id: number;
  name: string;
  price: number;
  category: string;
}

export class Product {
  async index(): Promise<IProduct[]> {
    try {
      const conn = await db.connect();

      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);

      conn.release();

      return result.rows as IProduct[];
    } catch (err: any) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(productId: string): Promise<IProduct | null> {
    try {
      const conn = await db.connect();

      const sql = "SELECT * FROM products WHERE product_id = $1";
      const result = await conn.query(sql, [productId]);

      conn.release();

      return (result.rows[0] as IProduct) || null;
    } catch (err: any) {
      throw new Error(`Could not get product. Error: ${err}`);
    }
  }

  async create(product: IProduct): Promise<IProduct | null> {
    try {
      const sql =
        "INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *";
      const conn = await db.connect();

      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add new product ${product.name}. Error: ${err}`
      );
    }
  }
}
