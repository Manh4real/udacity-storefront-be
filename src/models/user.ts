import bcrypt from "bcrypt";
import { db } from "../db";

export interface IUser {
  user_id: string;
  firstName: string;
  lastName: string;
  password: string;
}

export class User {
  async index(): Promise<IUser[]> {
    try {
      const conn = await db.connect();

      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);

      conn.release();

      return result.rows as IUser[];
    } catch (err: any) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(userId: string): Promise<IUser | null> {
    try {
      const conn = await db.connect();

      const sql = "SELECT * FROM users WHERE user_id = $1";
      const result = await conn.query(sql, [userId]);

      conn.release();

      return (result.rows[0] as IUser) || null;
    } catch (err: any) {
      throw new Error(`Could not get user. Error: ${err}`);
    }
  }

  async create(user: IUser): Promise<IUser | null> {
    try {
      const sql =
        "INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *";
      const conn = await db.connect();

      const hashedPassword = bcrypt.hashSync(user.password, 10);

      const result = await conn.query(sql, [
        user.firstName,
        user.lastName,
        hashedPassword,
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add new user ${user.firstName}. Error: ${err}`
      );
    }
  }
}
