import requests from "../requests";

const News = {
  createNews: (formData: FormData) =>
    requests.jwtApiPost("/api/admin/news/create", formData),
  getAdminNewsList: () => requests.jwtApiGet("/api/admin/news"),
  getRecentUpdates: () => requests.baseApiGet("/api/home/news/month"),
};
export default News;
