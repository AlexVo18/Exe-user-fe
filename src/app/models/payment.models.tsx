export interface UrlParams {
  code: string;
  id: string;
  cancel: boolean;
  status: string;
  orderCode: string;
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

export interface RecentTransactionData {
  transactionID: number;
  username: string;
  email: string;
  quantity: number;
  dateCreate: string;
}

export interface Transaction {
  transactionID: number;
  transactionCode: string;
  accountBank: string;
  accountName: string;
  bankCode: string;
  bankName: string;
  username: string;
  totalAmout: number;
  dateCreate: string;
  status: number;
}

export interface CreateDonationData {
  quantity: number;
  urlCancel: string;
  urlReturn: string;
}

export interface CreatePayment {
  orderID: number;
  accountID: number;
  quantity: number;
}
