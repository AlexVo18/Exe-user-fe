import axios from "axios";

const baseURL = "http://localhost:5084";

const baseApi = axios.create({
  baseURL,
  withCredentials: true,
});

export default baseApi;
