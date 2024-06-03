import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import baseApi from "./baseApi";
import { router } from "../routes/route";

const baseURL = "https://nuoicay.azurewebsites.net";

const jwtApi = axios.create({
  baseURL,
  withCredentials: true,
});

jwtApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default jwtApi;
