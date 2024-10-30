"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("../adaptors/controller"));
const middleware_1 = require("./middleware");
const routers = express_1.default.Router();
routers.post("/signup", controller_1.default.signup);
routers.post("/signin", controller_1.default.signin);
routers.post("/upload", middleware_1.middleware, controller_1.default.upload);
routers.get("/histroy/:email", controller_1.default.histroy);
routers.get("/allBooks", middleware_1.middleware, controller_1.default.listAllBooks);
routers.get("/searchBooks", middleware_1.middleware, controller_1.default.search);
exports.default = routers;
