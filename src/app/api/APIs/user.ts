import { LoginData, RegisterUserData } from "@/app/models/auth.models";
import requests from "../requests";

const User = {
  register: (input: RegisterUserData) =>
    requests.baseApiPost("/register", {
      //             userName: string;
      //   email: string;
      //   phoneNumber: string;
      //   fullName: string;
      //   password: string;
    }),
  login: (input: LoginData) =>
    requests.baseApiPost("/login", {
      username: input.username,
      password: input.password,
    }),
};

export default User;
