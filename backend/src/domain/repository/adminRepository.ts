import { title } from "process";
import { Admins } from "../../framworks/admin";
import { Books } from "../../framworks/pdf";
import { IBookDetails, IBookFields } from "../entities/Interfaces";
import { Users } from "../../framworks/users";
import { esClient } from "../../config/elasticSearch";

export default {
  signIn: async (email: string) => {
    try {
      return await Admins.findOne({ email });
    } catch (error) {
      console.log(error);
    }
  },
  
  addBook: async (
    coverImageUrl: string,
    pdfUrl: string,
    fields: IBookFields
  ) => {
    try {
      const createdBook = await Books.create({
        coverImage: coverImageUrl,
        pages: pdfUrl,
        title: fields.title,
        author: fields.author,
        year: fields.year,
        description: fields.description,
        isbn: fields.isbn,
      });

      const response = await esClient.index({
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
    } catch (error) {
      console.log("Error adding book to Elasticsearch:", error);
    }
  },
  checkBook: async (title: string, author: string) => {
    try {
      let check = await Books.find({ title, author });
      return check.length === 0 ? true : false;
    } catch (error) {
      console.log(error);
    }
  },
  books: async () => {
    try {
      return await Books.find();
    } catch (error) {
      console.log(error);
    }
  },
  updateImage: async (url: string, id: string) => {
    try {
      let data = await Books.findByIdAndUpdate(id, { coverImage: url });
      if (data) return data.coverImage;
    } catch (error) {
      console.log(error);
    }
  },
  deleteBook: async (id: string) => {
    try {
      await Books.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
    }
  },
  updateBook: async (bookId: string, data: IBookDetails) => {
    try {
      let update = await Books.findByIdAndUpdate(bookId, {
        coverImage: data.coverImage,
        title: data.title,
        author: data.author,
        description: data.description,
        isbn: data.isbn,
        year: data.year,
      });
      if (update) {
        return { success: true, message: "Book Updated" };
      } else {
        return { success: false, message: "somthing issus are here" };
      }
    } catch (error) {
      console.log(error);
    }
  },
  getCounts: async () => {
    try {
      const usersCount = await Users.countDocuments();
      const uniqueAuthors = await Books.distinct("author");
      const authorsCount = uniqueAuthors.length;

      const booksCount = await Books.countDocuments();

      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);
      const endOfToday = new Date();
      endOfToday.setHours(23, 59, 59, 999);

      const todaysBooksCount = await Books.countDocuments({
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
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
