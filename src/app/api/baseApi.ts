import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER;

const baseApi = axios.create({
  baseURL,
  withCredentials: true,
});

export default baseApi;
