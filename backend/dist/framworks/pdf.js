"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Books = void 0;
const mongoose_1 = require("mongoose");
const booksSchema = new mongoose_1.Schema({
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    year: {
        type: String,
    },
    coverImage: {
        type: String,
    },
    pages: {
        type: String,
    },
    description: {
        type: String
    },
    isbn: {
        type: String
    }
}, {
    timestamps: true,
});
exports.Books = (0, mongoose_1.model)("Books", booksSchema);
