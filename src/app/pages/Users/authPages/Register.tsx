import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/app/components/ui/input-otp";
import { Label } from "@/app/components/ui/label";
import useCountdown from "@/app/hooks/useCountdown";
import React, { startTransition, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { RegisterInput, RegisterUserData } from "@/app/models/auth.models";
import { ErrorMessageRegister } from "@/app/constants/errorMessages";
import { trimString } from "@/app/utils/trimString";
import Otp from "@/app/api/APIs/opt";
import customToast from "@/app/utils/customToast";
import {
  ErrorIcon,
  SuccessIcon,
  WarningIcon,
} from "@/app/components/toast/ToastIcons";
import { decodeOtp } from "@/app/utils/decodeOtp";
import DotLoading from "@/app/components/main/DotLoading";
import User from "@/app/api/APIs/user";
import Loading from "../../loadingPage/Loading";

const Register = () => {
  const [optInput, setOtpInput] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [otpMail, setOtpMail] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [isVerfied, setIsVerified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [otpLoading, setOtpLoading] = useState<boolean>(false);
  const { secondsLeft, start } = useCountdown();
  const navigate = useNavigate();
  const validate = ErrorMessageRegister;
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required(validate.username.required)
      .min(5, validate.username.length),
    email: Yup.string()
      .required(validate.email.required)
      .matches(/\.com$/, validate.email.invalidFormat),
    password: Yup.string()
      .required(validate.password.required)
      .min(6, validate.password.length)
      .matches(/^(?=.*[A-Z])(?=.*\s)/, validate.password.invalidFormat),
    rePassword: Yup.string()
      .required(validate.rePassword.required)
      .oneOf([Yup.ref("password")], validate.rePassword.invalid),
    firstName: Yup.string().required(validate.firstName.required),
    lastName: Yup.string().required(validate.lastName.required),
    phoneNumber: Yup.string()
      .required(validate.phoneNumber.required)
      .length(10, validate.phoneNumber.length),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phoneNumber: "",
      fullName: "",
      firstName: "",
      lastName: "",
      password: "",
      rePassword: "",
    } as RegisterInput,
    validationSchema,
    onSubmit: async (values: RegisterUserData) => {
      setIsLoading(true);

      console.log("Submitted values:", values);
      try {
        console.log(values);
        if (
          isVerfied &&
          values.email !== undefined &&
          values.fullName !== undefined &&
          values.password !== undefined &&
          values.phoneNumber !== undefined &&
          values.rePassword !== undefined &&
          values.username !== undefined
        ) {
          console.log(values);
          const response = await User.register({
            email: values.email,
            fullName: values.fullName,
            password: values.password,
            phoneNumber: values.phoneNumber,
            username: values.username,
          });
          if (response) {
            customToast({
              icon: <SuccessIcon />,
              description: "Tạo tài khoản thành công",
              duration: 3000,
            });
            navigate("/login");
          }
        }
      } catch (error) {
        customToast({
          icon: <ErrorIcon />,
          description: "Tạo tài khoản không thành công",
          duration: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  // useEffect(() => {
  //   console.log("Formik state:", formik);
  // }, [formik]);

  useEffect(() => {
    if (secondsLeft === 0) {
      setIsButtonDisabled(false);
    }
  }, [secondsLeft]);

  useEffect(() => {
    formik.setFieldValue(
      "fullName",
      formik.values.firstName + " " + formik.values.lastName
    );
  }, [formik.values.firstName, formik.values.lastName]);

  // Function handle OTP sau khi điền 6 ký tự
  const handleOTP = () => {
    if (isDisabled) return;
    if (otp.length === 6 && otp) {
      if (otp === otpMail) {
        setIsDisabled(true);
        setIsVerified(true);
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
      const response = await Otp.getOTP(formik.values.email);
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

    console.log("In");
    formik.handleSubmit();
  };

  return (
    <>
      {isLoading && <Loading />}
      <Card className="mx-auto max-w-2xl bg-opacity-90 my-5 ">
        <CardHeader className="flex items-center justify-center px-40">
          <div
            onClick={(e) => {
              e.preventDefault();
              startTransition(() => {
                navigate("/");
              });
            }}
            className="w-20 cursor-pointer"
          >
            <img
              src="images/Logo_With_Name.svg"
              alt="Logo.img"
              className="w-full"
            />
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleOnSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="lg:col-span-1 col-span-2">
                <div className="grid gap-2 text-mainBrown">
                  <Label htmlFor="username">
                    Tên Đăng Nhập <span className="text-red-500 ">*</span>
                  </Label>
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
                  {formik.touched.username && formik.errors.username ? (
                    <div className="text-red-600 text-sm">
                      {formik.errors.username}
                    </div>
                  ) : null}
                </div>
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
              <div className="lg:col-span-1 col-span-2">
                <div className="grid grid-cols-2 gap-3 text-mainBrown">
                  <div className="col-span-1">
                    <Label htmlFor="lastName">
                      Họ <span className="text-red-500 ">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={formik.values.lastName}
                      onChange={(e) => {
                        formik.setFieldValue("lastName", e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <div className="text-red-600 text-sm">
                        {formik.errors.lastName}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-span-1">
                    <Label htmlFor="firstName">
                      Tên <span className="text-red-500 ">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={formik.values.firstName}
                      onChange={(e) => {
                        formik.setFieldValue("firstName", e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <div className="text-red-600 text-sm">
                        {formik.errors.firstName}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="grid gap-2 text-mainBrown mt-3">
                  <div className="flex items-center">
                    <Label htmlFor="email">
                      Email <span className="text-red-500 ">*</span>
                    </Label>
                  </div>
                  <div className="flex">
                    <Input
                      id="email"
                      type="email"
                      value={formik.values.email}
                      onChange={(e) => {
                        formik.setFieldValue("email", e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                      required
                    />
                    <Button
                      className="text-sm w-20 bg-mainGreen hover:bg-mainBrown text-white"
                      onClick={handleSendOTP}
                      disabled={
                        isButtonDisabled ||
                        !(formik.touched.email && !formik.errors.email)
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
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-600 text-sm">
                      {formik.errors.email}
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
                <div
                  className={`grid gap-2 text-mainBrown ${
                    optInput ? "mt-1.5" : "mt-3"
                  } `}
                >
                  <Label htmlFor="phoneNumber">
                    Số Điện Thoại <span className="text-red-500 ">*</span>
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="text"
                    value={formik.values.phoneNumber}
                    onChange={(e) => {
                      formik.setFieldValue("phoneNumber", e.target.value);
                    }}
                    onBlur={formik.handleBlur}
                    required
                  />
                </div>
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <div className="text-red-600 text-sm">
                    {formik.errors.phoneNumber}
                  </div>
                ) : null}
              </div>
            </div>
            <div className=" flex w-full justify-center mt-5">
              <Button
                type="submit"
                className=" bg-mainGreen hover:bg-mainBrown px-40"
              >
                Đăng Kí
              </Button>
            </div>
          </form>

          <div className="mt-4 text-center text-sm">
            Có tài khoản rồi?{" "}
            <Link to={"/login"} className="underline">
              Đăng nhập
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Register;
