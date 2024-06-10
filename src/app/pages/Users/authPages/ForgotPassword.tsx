import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import Loading from "../../loadingPage/Loading";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import customToast from "@/app/utils/customToast";
import {
  ErrorIcon,
  SuccessIcon,
  WarningIcon,
} from "@/app/components/toast/ToastIcons";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ErrorMessageRegister } from "@/app/constants/errorMessages";
import User from "@/app/api/APIs/user";
import { ResetPasswordData } from "@/app/models/auth.models";
import useCountdown from "@/app/hooks/useCountdown";
import { decodeOtp } from "@/app/utils/decodeOtp";
import Otp from "@/app/api/APIs/opt";
import { trimString } from "@/app/utils/trimString";
import { Button } from "@/app/components/ui/button";
import DotLoading from "@/app/components/main/DotLoading";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/app/components/ui/input-otp";

const ForgotPassword = () => {
  const [optInput, setOtpInput] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [otpMail, setOtpMail] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [isVerfied, setIsVerified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [otpLoading, setOtpLoading] = useState<boolean>(false);
  const [isShowned, setIsShowned] = useState<boolean>(false);
  const { secondsLeft, start } = useCountdown();
  const navigate = useNavigate();

  const validate = ErrorMessageRegister; // Mã lỗi
  const validationSchema = Yup.object().shape({
    username: Yup.string().required(validate.username.required),
    password: Yup.string()
      .required(validate.password.required)
      .min(6, validate.password.length)
      .matches(/^(?=.*[A-Z])(?=.*\s)/, validate.password.invalidFormat),
    rePassword: Yup.string()
      .required(validate.rePassword.required)
      .oneOf([Yup.ref("password")], validate.rePassword.invalid),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      rePassword: "",
    } as ResetPasswordData,
    validationSchema,
    onSubmit: async (values: ResetPasswordData) => {
      setIsLoading(true);
      try {
        if (
          values.username !== undefined &&
          values.password !== undefined &&
          isVerfied
        ) {
          const response = await User.resetPassword({
            username: values.username,
            password: values.password,
          });
          if (response) {
            customToast({
              icon: <SuccessIcon />,
              description: "Đăng nhập thành công",
              duration: 3000,
            });
            navigate("/login");
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

  useEffect(() => {
    if (secondsLeft === 0) {
      setIsButtonDisabled(false);
    }
  }, [secondsLeft]);

  // Function handle OTP sau khi điền 6 ký tự
  const handleOTP = () => {
    if (isDisabled) return;
    if (otp.length === 6 && otp) {
      if (otp === otpMail) {
        setIsDisabled(true);
        setIsVerified(true);
        setIsShowned(true);
        customToast({
          icon: <SuccessIcon />,
          description: "Nhập mã thành công, email đã được xác thực",
          duration: 3000,
        });
      } else {
        setOtp("");
        customToast({
          icon: <ErrorIcon />,
          description: "OTP nhập không trùng khớp với OTP đã gửi qua mail",
          duration: 3000,
        });
      }
    }
  };

  // Function handle nhấn nút gửi otp đén mail
  const handleSendOTP = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOtpLoading(true);
    try {
      setOtpInput(true);
      setIsDisabled(false);
      const response = await Otp.getOTPUsername(formik.values.username);
      if (response) {
        const resOtp = decodeOtp(response);
        setOtpMail(resOtp);
        setIsButtonDisabled(true);
        start(60);
      }
    } catch (error) {
      customToast({
        icon: <WarningIcon />,
        description: "Đã xảy ra lỗi, không thể lấy danh sách",
        duration: 3000,
      });
    } finally {
      setOtpLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
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
              <Label htmlFor="username">
                Tên Đăng Nhập <span className="text-red-500 ">*</span>
              </Label>
              <div className="flex">
                <Input
                  id="username"
                  type="text"
                  value={formik.values.username}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "username",
                      trimString(e.target.value)
                    );
                  }}
                  onBlur={formik.handleBlur}
                  required
                />
                <Button
                  className="text-sm w-20 bg-mainGreen hover:bg-mainBrown text-white"
                  onClick={handleSendOTP}
                  disabled={
                    isButtonDisabled ||
                    !(formik.touched.username && !formik.errors.username)
                  }
                >
                  {otpLoading ? (
                    <DotLoading color={"#FFFFFF"} />
                  ) : secondsLeft > 0 ? (
                    secondsLeft
                  ) : (
                    "Gửi OTP"
                  )}
                </Button>
              </div>
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-600 text-sm">
                  {formik.errors.username}
                </div>
              ) : null}
            </div>
            {optInput ? (
              <div className="flex justify-center text-mainBrown mt-3">
                <InputOTP
                  id="otp"
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  onComplete={handleOTP}
                  disabled={isDisabled}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            ) : (
              <></>
            )}
            {isShowned ? (
              <div>
                <div className="grid gap-2 text-mainBrown mt-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">
                      Mật Khẩu <span className="text-red-500 ">*</span>
                    </Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={formik.values.password}
                    onChange={(e) => {
                      formik.setFieldValue("password", e.target.value);
                    }}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-600 text-sm">
                      {formik.errors.password}
                    </div>
                  ) : (
                    <div className="text-gray-400 text-sm">
                      Mật khẩu cần bắt đầu bằng chữ hoa và có ít nhất 1 dấu cách
                    </div>
                  )}
                </div>
                <div className="grid gap-2 text-mainBrown mt-3">
                  <div className="flex items-center">
                    <Label htmlFor="rePassword">
                      Nhập Lại Mật Khẩu <span className="text-red-500 ">*</span>
                    </Label>
                  </div>
                  <Input
                    id="rePassword"
                    type="password"
                    value={formik.values.rePassword}
                    onChange={(e) => {
                      formik.setFieldValue("rePassword", e.target.value);
                    }}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.rePassword && formik.errors.rePassword ? (
                    <div className="text-red-600 text-sm">
                      {formik.errors.rePassword}
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <></>
            )}
            <Button
              type="submit"
              className="w-full bg-mainGreen hover:bg-mainBrown"
            >
              Đổi Mật Khẩu
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Đã có tài khoản?{" "}
            <Link to={"/login"} className="underline">
              Đăng nhập
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ForgotPassword;
