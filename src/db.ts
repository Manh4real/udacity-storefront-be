import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const db = new Pool({
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT) || 4000,
});

export { db };