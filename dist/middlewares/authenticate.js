"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.authenticate = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var authenticate = function (req, res, next) {
    var authorizationHeader = req.headers.authorization;
    var token = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(" ")[1];
    if (token) {
        jsonwebtoken_1["default"].verify(token, process.env.JWT_SECRET, function (err, payload) {
            if (err) {
                return res.status(403).json({
                    status: "error",
                    message: "Invalid token"
                });
            }
            res.locals.user = payload;
            next();
        });
    }
    else {
        res.status(403).send({
            status: 403,
            error: "No token provided"
        });
    }
};
exports.authenticate = authenticate;
