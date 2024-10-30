"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JWT = {
    exp: process.env.EXPIRY || "1d",
    remember: process.env.REMEMBER || "7d",
    secret: process.env.JWT_SECRET || "",
};
exports.default = JWT;
