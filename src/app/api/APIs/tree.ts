import requests from "../requests";

const Tree = {
  getRecentTrees: () => requests.jwtApiGet("/api/admin/plantcodes/newest"),
  getUserTreesCode: (accountID: number) =>
    requests.jwtApiGet(`/api/user/plantcodes/${accountID}`),
  getTreesCodeDetail: (plantcode: string) =>
    requests.jwtApiGet(`/api/user/plantcodes/detail/${plantcode}`),
  getAdminTreesCode: () => requests.jwtApiGet("/api/admin/plantcodes"),
  getAdminTreeCodeDetail: (plantcode: string) =>
    requests.jwtApiGet(`/api/admin/plantcodes/detail/${plantcode}`),
  createTreeLog: (formData: FormData) =>
    requests.jwtApiPost("/api/admin/planttracking/create", formData),
};
export default Tree;
