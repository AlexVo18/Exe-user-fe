import { LoginData, RegisterUserData } from "@/app/models/auth.models";
import requests from "../requests";

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
  getUserInfo: () => requests.jwtApiGet("/api/admin/users"),
};

export default User;
