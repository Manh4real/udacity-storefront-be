import { Router } from "express";

import { authenticate } from "../middlewares/authenticate";
import * as orderHandlers from "../handlers/order";

const route = Router();

route.post(
  "/to-completed/:orderId",
  authenticate,
  orderHandlers.updateOrderToCompleted
);

// CURRENT user
route.get("/", authenticate, orderHandlers.getCurrentUserOrders);
route.get(
  "/completed",
  authenticate,
  orderHandlers.getCurrentUserCompletedOrders
);
route.post("/", authenticate, orderHandlers.createOrder);

// Specified user
route.get("/:userId", authenticate, orderHandlers.getOrdersByUserId);
route.get(
  "/completed/:userId",
  authenticate,
  orderHandlers.getCompletedOrdersByUserId
);
route.post("/:userId", authenticate, orderHandlers.createOrderByUserId);

export default route;
