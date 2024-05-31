import { Router } from "express";
import * as authHandlers from "../handlers/auth";

const routes = Router();

routes.post("/login", authHandlers.login);

export default routes;
