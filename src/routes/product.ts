import { Router } from "express";
import * as handlers from "../handlers/product";
import { authenticate } from "../middlewares/authenticate";

const routes = Router();

routes.get("/", handlers.getProducts);
routes.get("/:id", handlers.getProductById);
routes.post("/", authenticate, handlers.createProduct);

export default routes;
