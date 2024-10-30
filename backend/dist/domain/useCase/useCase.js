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
const jwt_1 = require("../helpers/jwt");
const PasswordHashing_1 = require("../helpers/PasswordHashing");
const repository_1 = __importDefault(require("../repository/repository"));
exports.default = {
    signUp: (userData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const password = yield PasswordHashing_1.Encrypt.cryptPassword(userData.password + "");
            const response = yield repository_1.default.signUp(userData, password);
            if ((response === null || response === void 0 ? void 0 : response.success) &&
                response.newUser &&
                response.message != "user already exists") {
                const { accessToken } = yield (0, jwt_1.CreateToken)({
                    id: response.newUser._id + "",
                    email: response.newUser.email,
                });
                return {
                    success: true,
                    newUser: response.newUser,
                    accessToken,
                    message: "User created successfully",
                };
            }
            else if ((response === null || response === void 0 ? void 0 : response.message) == "user already exists") {
                return response;
            }
            return null;
        }
        catch (error) {
            console.error("Sign-up error:", error);
            throw new Error("Sign-up failed");
        }
    }),
    signIn: (userData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield repository_1.default.signIn(userData.email + "");
            if (!user) {
                return {
                    success: false,
                    message: "User not found",
                };
            }
            else {
                const checkPassword = yield PasswordHashing_1.Encrypt.comparePassword(userData.password + "", user === null || user === void 0 ? void 0 : user.password);
                if (checkPassword) {
                    const { accessToken } = yield (0, jwt_1.CreateToken)({
                        id: user._id + "",
                        email: user.email,
                    });
                    const userDetails = {
                        userName: user.userName,
                        email: user.email,
                    };
                    return { success: true, accessToken, userDetails };
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
    upload: (email, data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const uploadPdf = yield repository_1.default.upload(email, data);
            if (uploadPdf === null || uploadPdf === void 0 ? void 0 : uploadPdf.success) {
                return { success: true, message: "PDF uploaded successfully" };
            }
            else {
                return { success: false, message: "Something went wrong" };
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    history: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield repository_1.default.history(email);
        }
        catch (error) {
            console.log(error);
        }
    }),
    listAllBooks: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield repository_1.default.listAllBooks();
        }
        catch (error) {
            console.log(error);
        }
    }),
    search: (query) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let data = yield repository_1.default.search(query);
            return data;
        }
        catch (error) {
            console.log(error);
        }
    })
};
