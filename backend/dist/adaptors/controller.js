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
const useCase_1 = __importDefault(require("../domain/useCase/useCase"));
exports.default = {
    signup: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield useCase_1.default.signUp(req.body.userData);
            if (response === null || response === void 0 ? void 0 : response.success) {
                res.status(200).json(response);
            }
            else if ((response === null || response === void 0 ? void 0 : response.message) == "user already exists") {
                res.status(204).json(response);
            }
            else {
                res.status(404).json(response);
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    signin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield useCase_1.default.signIn(req.body.userData);
            if (response === null || response === void 0 ? void 0 : response.success) {
                res.status(200).json(response);
            }
            else if ((response === null || response === void 0 ? void 0 : response.message) == "Incorrect password") {
                res.status(204).json(response);
            }
            else {
                res.status(404).json(response);
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    upload: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(req.body.email, req.body.data);
            const response = yield useCase_1.default.upload(req.body.email, req.body.data);
            if (response === null || response === void 0 ? void 0 : response.success) {
                res.status(200).json(response);
            }
            else {
                res.status(404).json(response);
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    histroy: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield useCase_1.default.history(req.params.email);
        }
        catch (error) {
            console.log(error);
        }
    }),
    listAllBooks: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield useCase_1.default.listAllBooks();
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    search: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("Search query:", req.query.query); // Log the incoming query
            const response = yield useCase_1.default.search(req.query.query + "");
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
            res.status(500).send("An error occurred while searching for books.");
        }
    }),
};
