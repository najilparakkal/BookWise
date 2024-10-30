"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminRouter = express_1.default.Router();
const adminController_1 = __importDefault(require("../adaptors/adminController"));
const middleware_1 = require("./middleware");
adminRouter.post("/adminLogin", adminController_1.default.signin);
adminRouter.get("/dashboard", middleware_1.adminMiddleware, adminController_1.default.dashboard);
adminRouter.post("/addBook", middleware_1.adminMiddleware, adminController_1.default.addBook);
adminRouter.get("/books", middleware_1.adminMiddleware, adminController_1.default.books);
adminRouter.post("/updateImage/:bookId", middleware_1.adminMiddleware, adminController_1.default.updateImage);
adminRouter.delete("/deleteBook/:bookId", middleware_1.adminMiddleware, adminController_1.default.deleteBook);
adminRouter.put("/updateBook/:bookId", middleware_1.adminMiddleware, adminController_1.default.updateBook);
exports.default = adminRouter;
