import { RequestHandler } from "express";
import { Product } from "../models/product";

const model = new Product();

export const getProducts: RequestHandler = async (req, res) => {
  try {
    const products = await model.index();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: "Cannot GET products",
      error: err,
    });
  }
};

export const getProductById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await model.show(id);

    res.status(200).send(product);
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: "Cannot GET product",
      error: err,
    });
  }
};

export const createProduct: RequestHandler = async (req, res) => {
  try {
    const body = req.body;
    const product = await model.create(body);

    res.status(200).send(product);
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: "Cannot POST product",
      error: err,
    });
  }
};
