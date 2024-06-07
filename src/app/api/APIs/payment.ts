import requests from "../requests";

const Payment = {
  getRecentTransaction: () =>
    requests.jwtApiGet("/api/admin/transactions/newest"),
  getTransactions: () => requests.jwtApiGet("/api/admin/transactions"),
};
export default Payment;
