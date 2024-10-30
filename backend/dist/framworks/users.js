"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = require("mongoose");
const usersSchema = new mongoose_1.Schema({
    userName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
}, {
    timestamps: true,
});
exports.Users = (0, mongoose_1.model)("Users", usersSchema);
