import { UrlParams } from "../models/payment.models";

export function parseParams(queryString: string): UrlParams {
  if (queryString.startsWith("?")) {
    queryString = queryString.substring(1);
  }

  const params = new URLSearchParams(queryString);
  const result: UrlParams = {
    code: "",
    id: "",
    cancel: true,
    status: "",
    orderCode: "",
  };

  params.forEach((value, key) => {
    switch (key) {
      case "code":
        result.code = value;
        break;
      case "id":
        result.id = value;
        break;
      case "cancel":
        result.cancel = value === "true"; // Convert to boolean
        break;
      case "status":
        result.status = value;
        break;
      case "orderCode":
        result.orderCode = value;
        break;
      default:
        break;
    }
  });
  return result;
}
