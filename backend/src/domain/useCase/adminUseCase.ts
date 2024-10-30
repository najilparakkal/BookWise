import {
  IAdminDetails,
  IBookDetails,
  IBookFields,
  IBookFiles,
} from "../entities/Interfaces";
import { uploadImage, uploadPDF } from "../helpers/cloudinary";
import { CreateToken } from "../helpers/jwt";
import { Encrypt } from "../helpers/PasswordHashing";
import repository from "../repository/adminRepository";

export default {
  signIn: async (adminData: IAdminDetails) => {
    try {
      const admin = await repository.signIn(adminData.email + "");
      if (!admin) {
        return {
          success: false,
          message: "admin not found",
        };
      } else {
        const checkPassword = await Encrypt.comparePassword(
          adminData.password + "",
          admin?.password
        );
        if (checkPassword) {
          const { accessToken } = await CreateToken({
            id: admin._id + "",
            email: admin.email,
          });
          return { success: true, accessToken };
        } else {
          return {
            success: false,
            message: "Incorrect password",
          };
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  addBook: async (files: any, feilds: IBookFields) => {
    try {
      let checkBookExists = await repository.checkBook(
        feilds.title,
        feilds.author
      );
      if (checkBookExists) {
        let coverImageUrl: string | undefined;
        let pdfUrl: string | undefined;

        if (files.coverImage && files.coverImage.length > 0) {
          coverImageUrl = await uploadImage(files.coverImage[0]?.filepath);
        }

        if (files.pages && files.pages.length > 0) {
          pdfUrl = await uploadPDF(files.pages[0]?.filepath);
        }
        const response = await repository.addBook(
          coverImageUrl + "",
          pdfUrl + "",
          feilds
        );
        return { message: "Book added", response, success: true };
      } else {
        return { message: "Book already exists", success: false };
      }
    } catch (error) {
      console.error("Error in addBook:", error);
    }
  },
  books: async () => {
    try {
      return await repository.books();
    } catch (error) {
      console.log(error);
    }
  },
  updateImage: async (files: any, bookId: string) => {
    try {
      let coverImageUrl;
      if (files.coverImage && files.coverImage.length > 0) {
        coverImageUrl = await uploadImage(files.coverImage[0]?.filepath);
      }
      return await repository.updateImage(coverImageUrl + "", bookId);
    } catch (error) {
      console.log(error);
    }
  },
  deleteBook: async (bookId: string) => {
    try {
      await repository.deleteBook(bookId);
      return {message:"book removed"}
    } catch (error) {
      console.log(error);
    }
  },
  updateBook: async (bookId: string, data: IBookDetails) => {
    try {
      return await repository.updateBook(bookId, data);
    } catch (error) {
      console.log(error);
    }
  },
  dashboard:async()=>{
    try {
        return await repository.getCounts()
       
    } catch (error) {
        console.log(error)
    }
  }
};
