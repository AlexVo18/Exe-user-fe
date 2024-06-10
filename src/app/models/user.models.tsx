export interface UserData {
  accountID: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  username: string;
  status: number;
}
export interface UserStatus {
  accountID: number;
  status: string;
}

export interface UpdateUserStatusParam {
  accountID: number;
  status: number;
}
