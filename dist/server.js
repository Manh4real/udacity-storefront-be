"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var user_1 = __importDefault(require("./routes/user"));
var product_1 = __importDefault(require("./routes/product"));
var order_1 = __importDefault(require("./routes/order"));
var order_product_1 = __importDefault(require("./routes/order-product"));
var auth_1 = __importDefault(require("./routes/auth"));
var app = (0, express_1["default"])();
var address = "0.0.0.0:3000";
app.use(body_parser_1["default"].json());
app.use("/products", product_1["default"]);
app.use("/users", user_1["default"]);
app.use("/orders", order_1["default"]);
app.use("/order-products", order_product_1["default"]);
app.use("/auth", auth_1["default"]);
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
