import requests from "../requests";

const News = {
  createNews: (formData: FormData) =>
    requests.jwtApiPost("/api/admin/news/create", formData),
  getAdminNewsList: () => requests.jwtApiGet("/api/admin/news"),
};
export default News;
