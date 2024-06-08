import path from "path";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";

import userRoutes from "./routes/user";
import productRoutes from "./routes/product";
import orderRoutes from "./routes/order";
import orderProductRoutes from "./routes/order-product";
import authRoutes from "./routes/auth";

dotenv.config();
export const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/order-products", orderProductRoutes);
app.use("/auth", authRoutes);

app.use("/default-product-image", (req, res) => {
  const _path = path.resolve(__dirname, "../../src/assets/images");
  const filePath = `${_path}/default-product-image.png`;

  res.sendFile(filePath);
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
