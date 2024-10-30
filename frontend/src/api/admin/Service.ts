import { AdminAxios, Axios } from "../axios";
import { IAdminDetails, IBookDetails } from "../Interfaces";
import Cookies from "js-cookie";

export const loginAdmin = async (adminData: IAdminDetails) => {
  try {
    const response: any = await Axios.post("/adminLogin", { adminData });
    if (response.status === 200) {
      Cookies.set("adminToken", response.data.accessToken);
      return response;
    }
    if (response.data?.message) {
      throw new Error(response.data.message + "");
    }
  } catch (err) {
    throw err;
  }
};
export const addBook = async (data: FormData) => {
  try {
    const res = await AdminAxios.post("/addBook", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.status === 200) {
      return true;
    } else {
      throw new Error("Book already exists");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchBooks = async () => {
  try {
    const response = await AdminAxios.get("/books");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateCoverImage = async (id: string, data: FormData) => {
  try {
    const response = await AdminAxios.post(`/updateImage/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBook = async (id: string) => {
  try {
    const response = await AdminAxios.delete(`/deleteBook/${id}`);
    return response.status === 200;
  } catch (error) {
    console.log(error);
  }
};

export const updateBook = async (id: string, datas: IBookDetails) => {
  try {
    const response = await AdminAxios.put(`/updateBook/${id}`, datas);
    return response.status === 200;
  } catch (error) {
    console.log(error);
  }
};

export const dashboard = async () => {
  try {
    const response = await AdminAxios.get("/dashboard");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const checkAdmin = async () => {
  let data = await Cookies.get("adminToken");
  if (data && data != undefined) {
    return true;
  } else {
    return false;
  }
};

export const logout = async () => {
  Cookies.remove("adminToken");
};
