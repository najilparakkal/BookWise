"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = require("../../framworks/admin");
const pdf_1 = require("../../framworks/pdf");
const users_1 = require("../../framworks/users");
const elasticSearch_1 = require("../../config/elasticSearch");
exports.default = {
    signIn: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield admin_1.Admins.findOne({ email });
        }
        catch (error) {
            console.log(error);
        }
    }),
    addBook: (coverImageUrl, pdfUrl, fields) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const createdBook = yield pdf_1.Books.create({
                coverImage: coverImageUrl,
                pages: pdfUrl,
                title: fields.title,
                author: fields.author,
                year: fields.year,
                description: fields.description,
                isbn: fields.isbn,
            });
            const response = yield elasticSearch_1.esClient.index({
                index: "books",
                id: createdBook.id,
                body: {
                    title: fields.title,
                    author: fields.author,
                    year: fields.year,
                    description: fields.description,
                    isbn: fields.isbn,
                    coverImage: coverImageUrl,
                    pages: pdfUrl,
                },
            });
            console.log("Indexing response:", response);
            return createdBook.id;
        }
        catch (error) {
            console.log("Error adding book to Elasticsearch:", error);
        }
    }),
    checkBook: (title, author) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let check = yield pdf_1.Books.find({ title, author });
            return check.length === 0 ? true : false;
        }
        catch (error) {
            console.log(error);
        }
    }),
    books: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield pdf_1.Books.find();
        }
        catch (error) {
            console.log(error);
        }
    }),
    updateImage: (url, id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let data = yield pdf_1.Books.findByIdAndUpdate(id, { coverImage: url });
            if (data)
                return data.coverImage;
        }
        catch (error) {
            console.log(error);
        }
    }),
    deleteBook: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield pdf_1.Books.findByIdAndDelete(id);
        }
        catch (error) {
            console.log(error);
        }
    }),
    updateBook: (bookId, data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let update = yield pdf_1.Books.findByIdAndUpdate(bookId, {
                coverImage: data.coverImage,
                title: data.title,
                author: data.author,
                description: data.description,
                isbn: data.isbn,
                year: data.year,
            });
            if (update) {
                return { success: true, message: "Book Updated" };
            }
            else {
                return { success: false, message: "somthing issus are here" };
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    getCounts: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const usersCount = yield users_1.Users.countDocuments();
            const uniqueAuthors = yield pdf_1.Books.distinct("author");
            const authorsCount = uniqueAuthors.length;
            const booksCount = yield pdf_1.Books.countDocuments();
            const startOfToday = new Date();
            startOfToday.setHours(0, 0, 0, 0);
            const endOfToday = new Date();
            endOfToday.setHours(23, 59, 59, 999);
            const todaysBooksCount = yield pdf_1.Books.countDocuments({
                createdAt: {
                    $gte: startOfToday,
                    $lte: endOfToday,
                },
            });
            return {
                usersCount,
                authorsCount,
                booksCount,
                todaysBooksCount,
            };
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }),
};
