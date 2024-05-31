import { RequestHandler } from "express";
import { User } from "../models/user";

const model = new User();

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const users = await model.index();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: "Cannot GET users",
    });
  }
};

export const getUserById: RequestHandler = async (req, res) => {
  try {
    const { user_id } = res.locals;
    const user = await model.show(user_id);

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: "Cannot GET user",
    });
  }
};

export const createUser: RequestHandler = async (req, res) => {
  try {
    const body = req.body;
    const user = await model.create(body);

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: "Cannot POST user",
    });
  }
};
