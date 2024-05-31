import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const authenticate: RequestHandler = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  const token = authorizationHeader?.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET!, (err, payload) => {
      if (err) {
        return res.status(403).json({
          status: "error",
          message: "Invalid token",
        });
      }

      res.locals.user = payload;
      next();
    });
  } else {
    res.status(403).send({
      status: 403,
      error: "No token provided",
    });
  }
};
