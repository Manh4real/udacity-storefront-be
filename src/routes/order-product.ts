import { Router } from "express";

import { authenticate } from "../middlewares/authenticate";
import * as orderProductHandlers from "../handlers/order-product";

const route = Router();

route.post("/", authenticate, orderProductHandlers.createOrderProduct);

export default route;
