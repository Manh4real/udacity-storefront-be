import { RequestHandler } from "express";

import { db } from "../db";
import { Order } from "../models/order";
import { MiscService } from "../services/misc";

const model = new Order();
const miscService = new MiscService();

export const createOrder: RequestHandler = async (req, res) => {
  try {
    const conn = await db.connect();
    const { user_id } = res.locals;

    const order = await model.create(user_id, req.body);

    res.status(200).send(order);

    conn.release();
  } catch (err) {
    res.status(500).send({
      status: 500,
      error: "Cannot POST order",
    });
  }
};
export const getCurrentUserOrders: RequestHandler = async (req, res) => {
  try {
    const conn = await db.connect();

    const { user_id } = res.locals;
    // const orders = await model.showCurrentUserOrders(user_id);
    const orders = await miscService.getFullInfoOfCurrentUserOrders(user_id);

    res.status(200).send(orders);

    conn.release();
  } catch (err) {
    res.status(500).send({
      status: 500,
      error: "Cannot GET orders of current user",
    });
  }
};
export const getCurrentUserCompletedOrders: RequestHandler = async (
  req,
  res
) => {
  try {
    const conn = await db.connect();

    const { user_id } = res.locals;
    // const orders = await model.showCurrentUserCompletedOrders(user_id);
    const orders = await miscService.getFullInfoOfCurrentUserCompletedOrders(
      user_id
    );

    res.status(200).send(orders);

    conn.release();
  } catch (err) {
    res.status(500).send({
      status: 500,
      error: "Cannot GET completed orders of current user",
    });
  }
};
