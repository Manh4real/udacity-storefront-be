import { Router } from "express";

import { authenticate } from "../middlewares/authenticate";
import * as orderHandlers from "../handlers/order";

const route = Router();

route.get("/", authenticate, orderHandlers.getCurrentUserOrders);
route.get(
  "/completed",
  authenticate,
  orderHandlers.getCurrentUserCompletedOrders
);
route.post("/", authenticate, orderHandlers.createOrder);

export default route;
