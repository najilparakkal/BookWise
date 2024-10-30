import { Request, response, Response } from "express";
import useCase from "../domain/useCase/adminUseCase";
import { multipartFormSubmission } from "../domain/helpers/formidable";
import { IBookFields } from "../domain/entities/Interfaces";
import { Fields } from "formidable";
import { error } from "console";

export default {
  signin: async (req: Request, res: Response) => {
    try {
      const response = await useCase.signIn(req.body.adminData);
      if (response?.success) {
        res.status(200).json(response);
      } else if (response?.message === "Incorrect password") {
        res.status(201).json(response);
      } else {
        res.status(404).json(response);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  addBook: async (req: Request, res: Response) => {
    try {
      const { files, fields } = (await multipartFormSubmission(req)) as {
        files: any;
        fields: Fields;
      };

      const bookFields: IBookFields = {
        title: fields.title?.[0] || "",
        author: fields.author?.[0] || "",
        year: fields.year?.[0] || "",
        isbn: fields.isbn?.[0] || "",
        description: fields.description?.[0] || "",
      };

      const response = await useCase.addBook(files, bookFields);
      if (response?.success) {
        res.status(200).json(response);
      } else {
        res
          .status(204)
          .json({ data: response?.message || "Book already exists." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },
  books: async (req: Request, res: Response) => {
    try {
      const response = await useCase.books();
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  updateImage: async (req: Request, res: Response) => {
    try {
      const { files } = (await multipartFormSubmission(req)) as {
        files: any;
      };
      const response = await useCase.updateImage(files, req.params.bookId);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  deleteBook: async (req: Request, res: Response) => {
    try {
      const response = await useCase.deleteBook(req.params.bookId);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  updateBook: async (req: Request, res: Response) => {
    try {
      const response = await useCase.updateBook(req.params.bookId, req.body);
      if (response?.success) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: "something is issue" });
      }
    } catch (error) {
      console.log(error);
    }
  },


  dashboard: async (req: Request, res: Response) => {
    try {
      const response = await useCase.dashboard();
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
    }
  },
};
