"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = exports.middleware = void 0;
const jwt_1 = require("../domain/helpers/jwt");
const middleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Token not provided" });
        }
        (0, jwt_1.VerifyToken)(token)
            .then(() => {
            console.log("Token is valid, proceeding to next middleware.");
            return next();
        })
            .catch((_a) => __awaiter(void 0, [_a], void 0, function* ({ err, message }) {
            if (message === "Token has expired") {
                return res.status(404).json({ error: "Token expired" });
            }
            return res.status(401).json({ error: "Invalid token" });
        }));
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.middleware = middleware;
const adminMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Token not provided" });
        }
        (0, jwt_1.VerifyToken)(token)
            .then(() => {
            console.log("Token is valid, proceeding to next middleware.");
            return next();
        })
            .catch((_a) => __awaiter(void 0, [_a], void 0, function* ({ err, message }) {
            if (message === "Token has expired") {
                return res.status(404).json({ error: "Token expired" });
            }
            return res.status(401).json({ error: "Invalid token" });
        }));
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.adminMiddleware = adminMiddleware;
