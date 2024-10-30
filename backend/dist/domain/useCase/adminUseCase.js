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
const cloudinary_1 = require("../helpers/cloudinary");
const jwt_1 = require("../helpers/jwt");
const PasswordHashing_1 = require("../helpers/PasswordHashing");
const adminRepository_1 = __importDefault(require("../repository/adminRepository"));
exports.default = {
    signIn: (adminData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const admin = yield adminRepository_1.default.signIn(adminData.email + "");
            if (!admin) {
                return {
                    success: false,
                    message: "admin not found",
                };
            }
            else {
                const checkPassword = yield PasswordHashing_1.Encrypt.comparePassword(adminData.password + "", admin === null || admin === void 0 ? void 0 : admin.password);
                if (checkPassword) {
                    const { accessToken } = yield (0, jwt_1.CreateToken)({
                        id: admin._id + "",
                        email: admin.email,
                    });
                    return { success: true, accessToken };
                }
                else {
                    return {
                        success: false,
                        message: "Incorrect password",
                    };
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    addBook: (files, feilds) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            let checkBookExists = yield adminRepository_1.default.checkBook(feilds.title, feilds.author);
            if (checkBookExists) {
                let coverImageUrl;
                let pdfUrl;
                if (files.coverImage && files.coverImage.length > 0) {
                    coverImageUrl = yield (0, cloudinary_1.uploadImage)((_a = files.coverImage[0]) === null || _a === void 0 ? void 0 : _a.filepath);
                }
                if (files.pages && files.pages.length > 0) {
                    pdfUrl = yield (0, cloudinary_1.uploadPDF)((_b = files.pages[0]) === null || _b === void 0 ? void 0 : _b.filepath);
                }
                const response = yield adminRepository_1.default.addBook(coverImageUrl + "", pdfUrl + "", feilds);
                return { message: "Book added", response, success: true };
            }
            else {
                return { message: "Book already exists", success: false };
            }
        }
        catch (error) {
            console.error("Error in addBook:", error);
        }
    }),
    books: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield adminRepository_1.default.books();
        }
        catch (error) {
            console.log(error);
        }
    }),
    updateImage: (files, bookId) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            let coverImageUrl;
            if (files.coverImage && files.coverImage.length > 0) {
                coverImageUrl = yield (0, cloudinary_1.uploadImage)((_a = files.coverImage[0]) === null || _a === void 0 ? void 0 : _a.filepath);
            }
            return yield adminRepository_1.default.updateImage(coverImageUrl + "", bookId);
        }
        catch (error) {
            console.log(error);
        }
    }),
    deleteBook: (bookId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield adminRepository_1.default.deleteBook(bookId);
            return { message: "book removed" };
        }
        catch (error) {
            console.log(error);
        }
    }),
    updateBook: (bookId, data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield adminRepository_1.default.updateBook(bookId, data);
        }
        catch (error) {
            console.log(error);
        }
    }),
    dashboard: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield adminRepository_1.default.getCounts();
        }
        catch (error) {
            console.log(error);
        }
    })
};
