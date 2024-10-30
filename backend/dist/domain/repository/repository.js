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
const elasticSearch_1 = require("../../config/elasticSearch");
const pdf_1 = require("../../framworks/pdf");
const users_1 = require("../../framworks/users");
exports.default = {
    signUp: (userData, password) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const findUser = yield users_1.Users.find({ email: userData.email });
            if (findUser.length === 0) {
                const newUser = yield users_1.Users.create({
                    email: userData.email,
                    userName: userData.userName,
                    password: password,
                });
                console.log(newUser);
                return { success: true, newUser };
            }
            else {
                return { success: false, message: "user already exists" };
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    signIn: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield users_1.Users.findOne({ email });
        }
        catch (error) {
            console.log(error);
        }
    }),
    upload: (email, data) => __awaiter(void 0, void 0, void 0, function* () {
        // try {
        //     const uploadPdf = await Pdf.create({
        //       userEmail: email,
        //       pdf: data,
        //     })
        //     return {success:true,uploadPdf};
        // } catch (error) {
        //     console.log(error)
        // }
    }),
    history: (email) => __awaiter(void 0, void 0, void 0, function* () {
        // try {
        //   return await Pdf.find({userEmail:email})
        // } catch (error) {
        //   console.log(error)
        // }
    }),
    listAllBooks: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield pdf_1.Books.find();
        }
        catch (error) {
            console.log(error);
        }
    }),
    search: (query) => __awaiter(void 0, void 0, void 0, function* () {
        const terms = query.split(" "); // Split the query into terms
        try {
            const result = yield elasticSearch_1.esClient.search({
                index: "books",
                body: {
                    query: {
                        bool: {
                            should: [
                                {
                                    multi_match: {
                                        query: query,
                                        fields: ["title", "author", "year"],
                                        type: "best_fields", // This will find the best match across the fields
                                    },
                                },
                                ...terms.map(term => ({
                                    multi_match: {
                                        query: term,
                                        fields: ["title", "author", "year"],
                                        type: "best_fields",
                                    },
                                })),
                            ],
                        },
                    },
                },
            });
            console.log(result.hits.hits, "🌹");
            const books = result.hits.hits.map((hit) => (Object.assign({ id: hit._id }, hit._source)));
            return books;
        }
        catch (error) {
            console.error("Elasticsearch error:", error);
            throw error;
        }
    }),
};
