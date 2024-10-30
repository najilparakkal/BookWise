"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureExpress = configureExpress;
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const body_parser_1 = __importDefault(require("body-parser")); // Corrected
const corsOptions = {
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
};
function configureExpress(app) {
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(body_parser_1.default.json());
    app.use((0, cors_1.default)(corsOptions));
    const errorHandler = (err, req, res, next) => {
        res.status(500).json({ err: err.message });
    };
    app.use(errorHandler);
    (0, database_1.connectDb)();
}
