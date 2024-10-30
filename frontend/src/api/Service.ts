import { Axios, AxiosWithToken } from "./axios";
import { IUserDetails } from "./Interfaces";

export const registerUser = async (userData: IUserDetails) => {
  try {
    const response = await Axios.post("/signup", { userData });
    return response;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (userData: IUserDetails) => {
  try {
    const response = await Axios.post("/signin", { userData });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllBooks = async () => {
  try {
    const response = await AxiosWithToken.get("/allBooks");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const searchBooks = async (query: string) => {
  try {
      const response = await AxiosWithToken.get(`/searchBooks`, {
          params: { query },
      });
      return response.data;
  } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
  }
};
