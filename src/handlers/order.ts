import { RequestHandler } from "express";

import { db } from "../db";
import { Order } from "../models/order";
import { MiscService } from "../services/misc";

const model = new Order();
const miscService = new MiscService();

export const updateOrderToCompleted: RequestHandler = async (req, res) => {
  try {
    const { orderId } = req.params;

    const isCompleted = await model.updateToCompleted(orderId);

    res.status(200).send(Boolean(isCompleted));
  } catch (err) {
    res.status(500).send({
      status: 500,
      error: "Cannot POST update order to completed",
    });
  }
};

export const createOrder: RequestHandler = async (req, res) => {
  try {
    const conn = await db.connect();

    // CREATE ORDER of CURRENT user
    const {
      user: { user_id },
    } = res.locals;

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

export const createOrderByUserId: RequestHandler = async (req, res) => {
  try {
    const conn = await db.connect();
    const { userId } = req.params;
    const order = await model.create(userId, req.body);

    res.status(200).send(order);

    conn.release();
  } catch (err) {
    res.status(500).send({
      status: 500,
      error: "Cannot POST order of the specified user",
    });
  }
};
export const getCurrentUserOrders: RequestHandler = async (req, res) => {
  try {
    const conn = await db.connect();

    const {
      user: { user_id },
    } = res.locals;
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

    const {
      user: { user_id },
    } = res.locals;
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

export const getOrdersByUserId: RequestHandler = async (req, res) => {
  try {
    const conn = await db.connect();

    const { userId } = req.params;
    // const orders = await model.showCurrentUserOrders(user_id);
    const orders = await miscService.getFullInfoOfCurrentUserOrders(userId);

    res.status(200).send(orders);

    conn.release();
  } catch (err) {
    res.status(500).send({
      status: 500,
      error: "Cannot GET orders of specified user",
    });
  }
};

export const getCompletedOrdersByUserId: RequestHandler = async (req, res) => {
  try {
    const conn = await db.connect();

    const { userId } = req.params;
    // const orders = await model.showCurrentUserCompletedOrders(user_id);
    const orders = await miscService.getFullInfoOfCurrentUserCompletedOrders(
      userId
    );

    res.status(200).send(orders);

    conn.release();
  } catch (err) {
    res.status(500).send({
      status: 500,
      error: "Cannot GET completed orders of specified user",
    });
  }
};
