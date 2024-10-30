import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

export const Axios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const AxiosWithToken: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + Cookies.get("jwt"),
  },
  withCredentials: true,
});

export const AdminAxios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + Cookies.get("adminToken"),
  },
  withCredentials: true,
});


