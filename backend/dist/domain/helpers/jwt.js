"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.VerifyToken = exports.CreateToken = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const jwt_1 = __importDefault(require("../../config/jwt"));
const CreateToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = jsonwebtoken_1.default.sign(payload, jwt_1.default.secret, { expiresIn: "7d" });
        return {
            accessToken,
        };
    }
    catch (error) {
        console.error("Error creating tokens:", error);
        throw new Error("Token creation failed");
    }
});
exports.CreateToken = CreateToken;
const VerifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, jwt_1.default.secret, (err, decoded) => {
            if (err) {
                if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                    return reject({ err, message: "Token has expired" });
                }
                const jwtPayload = jsonwebtoken_1.default.decode(token, { complete: true });
                return reject({ err, payload: jwtPayload === null || jwtPayload === void 0 ? void 0 : jwtPayload.payload });
            }
            resolve(decoded);
        });
    });
};
exports.VerifyToken = VerifyToken;
