import User from "@/app/api/APIs/user";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(username, password);
    if (username !== undefined && password !== undefined) {
      const response = await User.login({ username, password });
      if (response) {
        console.log(response);
      }
    }

    setIsLoading(false);
  };

  return (
    <Card className="mx-auto max-w-sm bg-opacity-90">
      <CardHeader className="flex items-center justify-center px-40">
        <Link to={"/"} className="w-20 cursor-pointer">
          <img
            src="images/Logo_With_Name.svg"
            alt="Logo.img"
            className="w-full"
          />
        </Link>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2 text-mainBrown">
            <Label htmlFor="username">Tên Đăng Nhập</Label>
            <Input
              id="username"
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
          </div>
          <div className="grid gap-2 text-mainBrown">
            <div className="flex items-center">
              <Label htmlFor="password">Mật Khẩu</Label>
            </div>
            <Input
              id="password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Link
                to={"/forgot"}
                className="ml-auto inline-block text-sm underline"
              >
                Quên mật khẩu?
              </Link>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-mainGreen hover:bg-mainBrown"
            onClick={(e) => handleOnSubmit(e)}
          >
            Đăng Nhập
          </Button>
        </div>

        <div className="mt-4 text-center text-sm">
          Không có tài khoản?{" "}
          <Link to={"/register"} className="underline">
            Đăng ký
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default Login;
