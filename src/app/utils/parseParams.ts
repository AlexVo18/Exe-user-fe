import { UrlParams } from "../models/payment.models";

export function parseParams(url: string): UrlParams {
  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);

  // Tạo object với url params
  const paramsObj: any = {};
  for (const [key, value] of params.entries()) {
    paramsObj[key] = value;
  }

  // Đổi paramsObj để giống với UrlParams interfacce
  const parsedParams: UrlParams = {
    code: parseInt(paramsObj.code, 10),
    id: paramsObj.id,
    cancel: paramsObj.cancel === "true",
    status: paramsObj.status,
    orderCode: parseInt(paramsObj.orderCode, 10),
  };

  return parsedParams;
}
