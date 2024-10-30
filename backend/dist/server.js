"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("./config/express");
const morgan_1 = __importDefault(require("morgan"));
const routers_1 = __importDefault(require("./webServer/routers"));
const adminRouters_1 = __importDefault(require("./webServer/adminRouters"));
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
(0, express_2.configureExpress)(app);
app.use((0, morgan_1.default)("dev"));
app.use("/api", routers_1.default);
app.use("/api", adminRouters_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
