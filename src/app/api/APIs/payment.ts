import { CreateDonationData } from "@/app/models/payment.models";
import requests from "../requests";

const Payment = {
  getRecentTransaction: () =>
    requests.jwtApiGet("/api/admin/transactions/newest"),
  getTransactions: () => requests.jwtApiGet("/api/admin/transactions"),
  createDonation: (input: CreateDonationData) =>
    requests.jwtApiGet(
      `/api/payos-generation-link-code?quantity=${input.quantity}&urlCancel=${input.urlCancel}&urlReturn=${input.urlReturn}`
    ),
};
export default Payment;
