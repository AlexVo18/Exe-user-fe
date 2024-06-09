import requests from "../requests";

const Donation = {
  getTopDonations: () => requests.baseApiGet("/api/home/orders/top"),
  getNewestDonations: () => requests.baseApiGet("/api/home/orders/new"),
};

export default Donation;
