import axios from "axios";

const baseURL = "https://nuoicay.azurewebsites.net";

const baseApi = axios.create({
  baseURL,
  withCredentials: true,
});

export default baseApi;
