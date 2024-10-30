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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminUseCase_1 = __importDefault(require("../domain/useCase/adminUseCase"));
const formidable_1 = require("../domain/helpers/formidable");
exports.default = {
    signin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield adminUseCase_1.default.signIn(req.body.adminData);
            if (response === null || response === void 0 ? void 0 : response.success) {
                res.status(200).json(response);
            }
            else if ((response === null || response === void 0 ? void 0 : response.message) === "Incorrect password") {
                res.status(201).json(response);
            }
            else {
                res.status(404).json(response);
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }),
    addBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        try {
            const { files, fields } = (yield (0, formidable_1.multipartFormSubmission)(req));
            const bookFields = {
                title: ((_a = fields.title) === null || _a === void 0 ? void 0 : _a[0]) || "",
                author: ((_b = fields.author) === null || _b === void 0 ? void 0 : _b[0]) || "",
                year: ((_c = fields.year) === null || _c === void 0 ? void 0 : _c[0]) || "",
                isbn: ((_d = fields.isbn) === null || _d === void 0 ? void 0 : _d[0]) || "",
                description: ((_e = fields.description) === null || _e === void 0 ? void 0 : _e[0]) || "",
            };
            const response = yield adminUseCase_1.default.addBook(files, bookFields);
            if (response === null || response === void 0 ? void 0 : response.success) {
                res.status(200).json(response);
            }
            else {
                res
                    .status(204)
                    .json({ data: (response === null || response === void 0 ? void 0 : response.message) || "Book already exists." });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error", error });
        }
    }),
    books: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield adminUseCase_1.default.books();
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    updateImage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { files } = (yield (0, formidable_1.multipartFormSubmission)(req));
            const response = yield adminUseCase_1.default.updateImage(files, req.params.bookId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    deleteBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield adminUseCase_1.default.deleteBook(req.params.bookId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    updateBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield adminUseCase_1.default.updateBook(req.params.bookId, req.body);
            if (response === null || response === void 0 ? void 0 : response.success) {
                res.status(200).json(response);
            }
            else {
                res.status(404).json({ message: "something is issue" });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    dashboard: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield adminUseCase_1.default.dashboard();
            res.status(200).json(response);
        }
        catch (err) {
            console.log(err);
        }
    }),
};
