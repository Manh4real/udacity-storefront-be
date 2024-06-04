import { RequestHandler } from "express";

import { db } from "../db";
import { OrderProduct } from "../models/order_product";

const model = new OrderProduct();

export const createOrderProduct: RequestHandler = async (req, res) => {
  try {
    const conn = await db.connect();

    const orderProduct = await model.create(req.body);

    res.status(200).send(orderProduct);

    conn.release();
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: "Cannot POST order product",
      error: err,
    });
  }
};
