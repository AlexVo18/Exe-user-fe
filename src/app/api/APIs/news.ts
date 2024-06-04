import { CreateNewsData } from "@/app/models/news.models";
import requests from "../requests";

const News = {
  createNews: (formData: FormData) =>
    requests.jwtApiPost("/api/admin/news/create", formData),
};
export default News;
