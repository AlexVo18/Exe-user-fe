import User from "@/app/api/APIs/user";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../loadingPage/Loading";
import { Eye, EyeOff } from "lucide-react";
import { useFormik } from "formik";
import { ErrorMessageLogin } from "@/app/constants/errorMessages";
import { LoginData, UserData } from "@/app/models/auth.models";
import * as Yup from "yup";
import { ErrorIcon, SuccessIcon } from "@/app/components/toast/ToastIcons";
import customToast from "@/app/utils/customToast";
import { AuthContext } from "@/app/contexts/AuthContext";

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowned, setIsShowned] = useState<boolean>(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validate = ErrorMessageLogin; // Mã lỗi
  const validationSchema = Yup.object().shape({
    username: Yup.string().required(validate.username.required),
    password: Yup.string().required(validate.password.required),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    } as LoginData,
    validationSchema,
    onSubmit: async (values: LoginData) => {
      setIsLoading(true);
      try {
        if (values.username !== undefined && values.password !== undefined) {
          const response = await User.login({
            username: values.username,
            password: values.password,
          });
          if (response) {
            if (response.token) {
              const userData: UserData = {
                accountID: response.accountID,
                email: response.email,
                username: response.username,
                fullName: response.fullName,
                phoneNumber: response.phoneNumber,
                roleID: response.roleID,
                status: response.status,
              };
              login(userData, response.token);
              customToast({
                icon: <SuccessIcon />,
                description: "Đăng nhập thành công",
                duration: 3000,
              });
              if (response.roleID === 1) {
                navigate("/admin");
              } else {
                navigate("/");
              }
            }
          }
        }
      } catch (error) {
        customToast({
          icon: <ErrorIcon />,
          description: "Tên đăng nhập hoặc Mật khẩu không đúng",
          duration: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  // useEffect(() => {
  //   if (Object.keys(formik.errors).length > 0) {
  //     Object.values(formik.errors).forEach((error) => {
  //       // showToast(error);
  //     });
  //   }
  // }, [formik.errors]);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const toggleVisibility = () => {
    // setIsShowned(!isShowned);
    console.log(isShowned);
    setIsShowned((prevState) => !prevState);
  };

  return (
    <>
      {isLoading && <Loading />}
      <Card className="mx-auto max-w-sm bg-opacity-90">
        <CardHeader className="flex items-center justify-center px-40">
          <Link to={"/"} className="w-20 cursor-pointer">
            <img
              src="images/Logo_With_Name.jpg"
              alt="Logo.img"
              className="w-full"
            />
          </Link>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleOnSubmit} className="grid gap-4">
            <div className="grid gap-2 text-mainBrown">
              <Label htmlFor="username">Tên Đăng Nhập</Label>
              <Input
                id="username"
                type="text"
                value={formik.values.username}
                onChange={(e) => {
                  formik.setFieldValue("username", e.target.value);
                }}
                required
              />
            </div>
            <div className="grid gap-2 text-mainBrown">
              <div className="flex items-center">
                <Label htmlFor="password">Mật Khẩu</Label>
              </div>
              <div className="relative flex items-center">
                <Input
                  id="password"
                  type={isShowned ? "text" : "password"}
                  onChange={(e) => {
                    formik.setFieldValue("password", e.target.value);
                  }}
                  required
                />
                <div
                  className="cursor-pointer absolute right-2"
                  onClick={toggleVisibility}
                >
                  {isShowned ? <EyeOff /> : <Eye />}
                </div>
              </div>
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
            >
              Đăng Nhập
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Không có tài khoản?{" "}
            <Link to={"/register"} className="underline">
              Đăng ký
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Login;
