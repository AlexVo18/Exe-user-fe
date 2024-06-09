export interface UserData {
  accountID: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  username: string;
  status: 0 | 1;
}
export interface UserStatus {
  accountID: number;
  status: string;
}
