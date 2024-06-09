import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RequestHandler } from "express";

import crypto from "crypto";
crypto.randomBytes(48);

import { db } from "../db";
import { IUser } from "../models/user";

export const login: RequestHandler = async (req, res) => {
  try {
    const conn = await db.connect();

    const { user_id, password } = req.body;

    const selectUserSql = "SELECT * FROM users WHERE user_id = $1";
    const result = await db.query(selectUserSql, [user_id]);
    const user = result.rows[0] as IUser;

    if (user) {
      const isValid = bcrypt.compareSync(password, user.password);

      if (!isValid) {
        res.status(403).send({
          status: 403,
          error: "Wrong userID or password",
        });
      } else {
        const token = jwt.sign(
          {
            user_id: user.user_id,
            firstName: user.firstName,
            lastName: user.lastName,
          },
          process.env.JWT_SECRET!
        );

        res.status(200).send({
          accessToken: token,
        });
      }
    } else {
      res.status(404).send({
        status: 404,
        message: "The user doesn't exist",
      });
    }

    conn.release();
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: "Cannot login. The user doesn't exist",
      error: err,
    });
  }
};
