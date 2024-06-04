import requests from "../requests";

const Payment = {
  getTotalProfit: () => requests.jwtApiGet("/api/admin/total"),
};
export default Payment;
