import requests from "../requests";

const Tree = {
  getRecentTrees: () => requests.jwtApiGet("/api/admin/plantcodes/newest"),
  getUserTreesCode: (accountID: number) =>
    requests.jwtApiGet(`/api/user/plantcodes/${accountID}`),
  getTreesCodeDetail: (plantcode: string) =>
    requests.jwtApiGet(`/api/user/plantcodes/detail/${plantcode}`),
};
export default Tree;
