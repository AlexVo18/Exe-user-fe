import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/app/components/ui/input-otp";
import { Label } from "@/app/components/ui/label";
import { toast } from "@/app/components/ui/use-toast";
import { toastTop } from "@/app/constants/cssContstants";
import useCountdown from "@/app/hooks/useCountdown";
import React, { startTransition, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { RegisterUserData } from "@/app/models/auth.models";
import { ErrorMessageRegister } from "@/app/constants/errorMessages";

const Register = () => {
  const [optInput, setOtpInput] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const { secondsLeft, start } = useCountdown();
  const navigate = useNavigate();
  const validate = ErrorMessageRegister;
  const validationSchema = Yup.object().shape({});

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phoneNumber: "",
      fullName: "",
      password: "",
    } as RegisterUserData,
    validationSchema,
    onSubmit: async (values: RegisterUserData) => {},
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
      // setIsDisabled(true);
      toast({
        duration: 2000,
        description: "Works",
        className: toastTop,
      });
    }
  };

  // useEffect(() => {
  //   console.log(otp)
  // }, [otp])

  // Function handle nhấn nút gửi otp đén mail
  const handleSendOTP = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOtpInput(true);
    setIsDisabled(false);
    setOtp("");
    setIsButtonDisabled(true);
    start(60);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  return (
    <Card className="mx-auto max-w-sm bg-opacity-90">
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
        <div className="grid gap-4">
          <div className="grid gap-2 text-mainBrown">
            <Label htmlFor="username">
              Tên Đăng Nhập <span className="text-red-500 ">*</span>
            </Label>
            <Input
              id="username"
              type="text"
              required
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="grid gap-2 text-mainBrown">
            <div className="flex items-center">
              <Label htmlFor="password">
                Mật Khẩu <span className="text-red-500 ">*</span>
              </Label>
            </div>
            <Input id="password" type="password" required />

            <div className="text-gray-400 text-sm">
              Mật khẩu cần bắt đầu bằng chữ hoa và có ít nhất 1 dấu cách
            </div>
          </div>
          <div className="grid gap-2 text-mainBrown">
            <div className="flex items-center">
              <Label htmlFor="re-password">
                Nhập Lại Mật Khẩu <span className="text-red-500 ">*</span>
              </Label>
            </div>
            <Input id="re-password" type="password" required />
          </div>
          <div className="grid gap-2 text-mainBrown">
            <div className="flex items-center">
              <Label htmlFor="email">
                Email <span className="text-red-500 ">*</span>
              </Label>
            </div>
            <div className="flex">
              <Input id="email" type="email" required />
              <Button
                className="text-sm w-20 bg-mainGreen hover:bg-mainBrown text-white"
                onClick={handleSendOTP}
                disabled={isButtonDisabled}
              >
                {secondsLeft > 0 ? secondsLeft : "Gửi OTP"}
              </Button>
            </div>
          </div>
          {optInput ? (
            <div className="flex justify-center text-mainBrown">
              <InputOTP
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

          <Button
            type="submit"
            className="w-full bg-mainGreen hover:bg-mainBrown"
          >
            Đăng Kí
          </Button>
        </div>

        <div className="mt-4 text-center text-sm">
          Có tài khoản rồi?{" "}
          <Link to={"/login"} className="underline">
            Đăng nhập
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default Register;
