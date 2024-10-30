import cors from "cors";
import { connectDb } from "./database";
import { Application, ErrorRequestHandler } from "express";
import bodyParser from "body-parser"; // Corrected

const corsOptions = {
  origin: process.env.ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
};

export function configureExpress(app: Application): void {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors(corsOptions));

  const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(500).json({ err: err.message });
  };

  app.use(errorHandler);
  connectDb();   
}
  