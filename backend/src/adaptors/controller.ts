import { Request, response, Response } from "express";
import useCase from "../domain/useCase/useCase";

export default {
  signup: async (req: Request, res: Response) => {
    try {
      const response = await useCase.signUp(req.body.userData);
      if (response?.success) {
        res.status(200).json(response);
      } else if (response?.message == "user already exists") {
        res.status(204).json(response);
      } else {
        res.status(404).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  },
  signin: async (req: Request, res: Response) => {
    try {
      const response = await useCase.signIn(req.body.userData);
      if (response?.success) {
        res.status(200).json(response);
      } else if (response?.message == "Incorrect password") {
        res.status(204).json(response);
      } else {
        res.status(404).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  },
  upload: async (req: Request, res: Response) => {
    try {
      console.log(req.body.email, req.body.data);
      const response = await useCase.upload(req.body.email, req.body.data);
      if (response?.success) {
        res.status(200).json(response);
      } else {
        res.status(404).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  },
  histroy: async (req: Request, res: Response) => {
    try {
      const response = await useCase.history(req.params.email);
    } catch (error) {
      console.log(error);
    }
  },
  listAllBooks: async (req: Request, res: Response) => {
    try {
      const response = await useCase.listAllBooks();
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  search: async (req: Request, res: Response) => {
    try {
      console.log("Search query:", req.query.query); // Log the incoming query
      const response = await useCase.search(req.query.query+"");
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).send("An error occurred while searching for books.");
    }
  },
};
