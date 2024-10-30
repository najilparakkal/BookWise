import express from "express";
const adminRouter = express.Router();
import controller from "../adaptors/adminController";
import { adminMiddleware } from "./middleware";

adminRouter.post("/adminLogin", controller.signin);

adminRouter.get("/dashboard", adminMiddleware, controller.dashboard);
adminRouter.post("/addBook", adminMiddleware, controller.addBook);
adminRouter.get("/books", adminMiddleware, controller.books);
adminRouter.post(
  "/updateImage/:bookId",
  adminMiddleware,
  controller.updateImage
);
adminRouter.delete(
  "/deleteBook/:bookId",
  adminMiddleware,
  controller.deleteBook
);
adminRouter.put("/updateBook/:bookId", adminMiddleware, controller.updateBook);
export default adminRouter;
