import { RequestHandler } from "express";
import { VerifyToken } from "../domain/helpers/jwt";

export const middleware: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] as string;

    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }
    VerifyToken(token)
      .then(() => {
        console.log("Token is valid, proceeding to next middleware.");
        return next();
      })
      .catch(async ({ err, message }) => {
        if (message === "Token has expired") {
          return res.status(404).json({ error: "Token expired" });
        }
        return res.status(401).json({ error: "Invalid token" });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const adminMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] as string;
    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }
    VerifyToken(token)
      .then(() => {
        console.log("Token is valid, proceeding to next middleware.");
        return next();
      })
      .catch(async ({ err, message }) => {
        if (message === "Token has expired") {
          return res.status(404).json({ error: "Token expired" });
        }
        return res.status(401).json({ error: "Invalid token" });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
