import { Router } from "express";
import * as handlers from "../handlers/user";
import { authenticate } from "../middlewares/authenticate";

const routes = Router();

routes.get("/", authenticate, handlers.getUsers);
routes.get("/:id", authenticate, handlers.getUserById);
routes.post("/", authenticate, handlers.createUser);

export default routes;
