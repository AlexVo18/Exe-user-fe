import requests from "../requests";

const Tree = {
  getRecentTrees: () => requests.jwtApiGet("/api/admin/plantcodes/newest"),
};
export default Tree;
