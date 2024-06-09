export interface UserData {
  accountID: number;
  email: string;
  fullName: string;
  username: string;
  phoneNumber: string;
  roleID: number;
  token?: string;
  status: number;
}

export interface RegisterUserData {
  username: string;
  email: string;
  phoneNumber: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  password: string;
  rePassword?: string
}

export interface RegisterInput {
  username: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface LoginData {
  username: string;
  password: string;
}
