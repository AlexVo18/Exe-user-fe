import requests from "../requests";

const Revenue = {
  getTotalProfit: () => requests.jwtApiGet("/api/admin/total"),
  getThisMonthProfit: () => requests.jwtApiGet("/api/admin/total/eachmonth"),
};
export default Revenue;
