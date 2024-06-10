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

export interface UpdateProfileParams {
  AccountID: number;
  FullName: string;
  Email: string;
  PhoneNumber: string;
}

export interface ProfileData {
  accountID: number;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber: string;
  username: string;
}
