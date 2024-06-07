import { ReactNode, createContext, useEffect, useState } from "react";
import { UserData } from "../models/auth.models";
import { jwtDecode } from "jwt-decode";

interface Props {
  children: ReactNode;
}

interface AuthContextType {
  userInfo: UserData | undefined;
  token: string | undefined;
  userLoading: boolean;
  login: (userData: UserData, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  userInfo: undefined,
  token: undefined,
  userLoading: true,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: Props) => {
  const [userInfo, setUserInfo] = useState<UserData | undefined>();
  const [token, setToken] = useState<string | undefined>();
  const [userLoading, setUserLoading] = useState<boolean>(true);

  useEffect(() => {
    const getLocalData = async () => {
      try {
        const storageToken = localStorage.getItem("access_token");
        const storageUser = localStorage.getItem("user");
        if (checkIsTokenExp(storageToken)) {
          logout();
        } else {
          if (storageToken && storageUser) {
            const user = JSON.parse(storageUser) as UserData;
            setUserInfo(user);
            setToken(storageToken);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setUserLoading(false);
      }
    };
    getLocalData();
  }, []);

  // useEffect(() => {
  //   console.log("userInfo:", userInfo);
  //   console.log("token:", token);
  // }, [userInfo]);

  const checkIsTokenExp = (token: string | null) => {
    if (token) {
      const decodedToken = jwtDecode(token) as { exp: number };
      return decodedToken.exp < Date.now() / 1000;
    }
    return false;
  };

  const login = (userData: UserData, token: string) => {
    const stringifyUser = JSON.stringify(userData);

    localStorage.setItem("user", stringifyUser);
    localStorage.setItem("access_token", token);

    setUserInfo(userData);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");

    setUserInfo(undefined);
    setToken(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ userInfo, token, userLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
