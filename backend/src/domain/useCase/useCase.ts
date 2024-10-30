import { IUserDetails } from "../entities/Interfaces";
import { CreateToken } from "../helpers/jwt";
import { Encrypt } from "../helpers/PasswordHashing";
import repository from "../repository/repository";

export default {
  signUp: async (userData: IUserDetails) => {
    try {
      const password = await Encrypt.cryptPassword(userData.password + "");

      const response = await repository.signUp(userData, password);
      if (
        response?.success &&
        response.newUser &&
        response.message != "user already exists"
      ) {
        const { accessToken } = await CreateToken({
          id: response.newUser._id + "",
          email: response.newUser.email,
        });

        return {
          success: true,
          newUser: response.newUser,
          accessToken,
          message: "User created successfully",
        };
      } else if (response?.message == "user already exists") {
        return response;
      }
      return null;
    } catch (error) {
      console.error("Sign-up error:", error);
      throw new Error("Sign-up failed");
    }
  },
  signIn: async (userData: IUserDetails) => {
    try {
      const user = await repository.signIn(userData.email + "");
      if (!user) {
        return {
          success: false,
          message: "User not found",
        };
      } else {
        const checkPassword = await Encrypt.comparePassword(
          userData.password + "",
          user?.password
        );
        if (checkPassword) {
          const { accessToken } = await CreateToken({
            id: user._id + "",
            email: user.email,
          });
          const userDetails = {
            userName: user.userName,
            email: user.email,
          };
          return { success: true, accessToken, userDetails };
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
  upload: async (email: string, data: string) => {
    try {
      const uploadPdf = await repository.upload(email, data);
      if (uploadPdf?.success) {
        return { success: true, message: "PDF uploaded successfully" };
      } else {
        return { success: false, message: "Something went wrong" };
      }
    } catch (error) {
      console.log(error);
    }
  },
  history: async (email: string) => {
    try {
      return await repository.history(email);
    } catch (error) {
      console.log(error);
    }
  },
  listAllBooks: async () => {
    try {
      return await repository.listAllBooks();
    } catch (error) {
      console.log(error);
    }
  },
  search:async(query:string)=>{
    try {
      let data = await repository.search(query)
      return data
    } catch (error) {
      console.log(error)
    }
  }
};
