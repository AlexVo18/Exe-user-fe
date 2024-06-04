export interface Payment {
  accountBank: string;
  bankCode: string;
  bankName: string;
  accountID: number;
  paymentText: string;
  totalAmount: number;
  quantity: number;
  totalQuantity: number;
}

export interface Bank {
  id: number;
  name: string;
  code: string;
  bin: string;
  shortName: string;
  logo: string;
  transferSupported: number;
  lookupSupported: number;
  short_name: string;
  support: number;
  isTransfer: number;
  swift_code: string;
}
