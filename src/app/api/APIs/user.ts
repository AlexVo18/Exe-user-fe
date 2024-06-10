import { LoginData, RegisterUserData } from "@/app/models/auth.models";
import requests from "../requests";
import { UpdateUserStatusParam } from "@/app/models/user.models";

const User = {
  register: (input: RegisterUserData) =>
    requests.baseApiPost("api/register", {
      userName: input.username,
      email: input.email,
      phoneNumber: input.phoneNumber,
      fullName: input.fullName,
      password: input.password,
    }),
  login: (input: LoginData) =>
    requests.baseApiPost("/login", {
      username: input.username,
      password: input.password,
    }),
  getUserAdmin: () => requests.jwtApiGet("/api/admin/users"),
  banUser: (input: UpdateUserStatusParam) =>
    requests.jwtApiPut("/api/admin/users/update_status", {
      accountID: input.accountID,
      status: input.status,
    }),
};

export default User;
