import { ReactNode, createContext, useEffect, useState } from "react";
import { UserData } from "../models/auth.models";
import { jwtDecode } from "jwt-decode";

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
  userLoading: false,
  login: () => {},
  logout: () => {},
});

const AuthProvider = (children: ReactNode) => {
  const [userInfo, setUserInfo] = useState<UserData | undefined>();
  const [token, setToken] = useState<string | undefined>();
  const [userLoading, setUserLoading] = useState<boolean>(false);

  useEffect(() => {
    try {
      setUserLoading(true);
      const getLocalData = async () => {
        const storageToken = localStorage.getItem("access_token");
        const storageUser = localStorage.getItem("user");
        if (checkIsTokenExp()) {
          logout();
        } else {
          if (storageToken && storageUser) {
            const user = JSON.parse(storageUser);
            setUserInfo(user);
            setToken(storageToken);
          }
        }
        setUserLoading(false);
      };
      getLocalData();
    } catch (error) {
      console.log(error);
      setUserLoading(false);
    }
  }, []);

  const checkIsTokenExp = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const date = new Date();
      const decodedToken = jwtDecode(token) as { exp: number };

      if (decodedToken.exp - date.getTime() <= 0) {
        return true;
      }
    }
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
