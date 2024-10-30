"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admins = void 0;
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
}, {
    timestamps: true,
});
exports.Admins = (0, mongoose_1.model)("Admins", adminSchema);
