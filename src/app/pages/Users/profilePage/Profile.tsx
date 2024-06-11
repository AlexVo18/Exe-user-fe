import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { AuthContext } from "@/app/contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  ErrorIcon,
  SuccessIcon,
  WarningIcon,
} from "@/app/components/toast/ToastIcons";
import customToast from "@/app/utils/customToast";
import User from "@/app/api/APIs/user";
import { ErrorMessageRegister } from "@/app/constants/errorMessages";
import { ProfileData } from "@/app/models/user.models";
import Otp from "@/app/api/APIs/opt";
import { decodeOtp } from "@/app/utils/decodeOtp";
import useCountdown from "@/app/hooks/useCountdown";
import { Label } from "@/app/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/app/components/ui/input-otp";
import DotLoading from "@/app/components/main/DotLoading";
import Loading from "../../loadingPage/Loading";

const Profile = () => {
  const { userInfo, userLoading } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [otpLoading, setOtpLoading] = useState<boolean>(false);
  const [optInput, setOtpInput] = useState<boolean>(false);
  const [profile, setProfile] = useState<ProfileData>();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [otpMail, setOtpMail] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const { secondsLeft, start } = useCountdown();
  const validate = ErrorMessageRegister;
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(validate.email.required)
      .matches(/\.com$/, validate.email.invalidFormat),
    firstName: Yup.string().required(validate.firstName.required),
    lastName: Yup.string().required(validate.lastName.required),
    phoneNumber: Yup.string()
      .required(validate.phoneNumber.required)
      .length(10, validate.phoneNumber.length),
  });

  useEffect(() => {
    const getProfile = async () => {
      try {
        if (userInfo) {
          const response = await User.getProfile(userInfo?.accountID);
          if (response) {
            setProfile(response);
          }
        }
      } catch (error) {
        customToast({
          icon: <WarningIcon />,
          description: "Lấy dữ liệu người dùng không thành công",
          duration: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    };
    getProfile();
  }, [userInfo]);

  const formik = useFormik({
    initialValues: {
      accountID: profile?.accountID || "",
      email: profile?.email || "",
      phoneNumber: profile?.phoneNumber || "",
      username: profile?.username || "",
      fullName: profile?.fullName,
      firstName: "",
      lastName: "",
    } as ProfileData,
    validationSchema,
    onSubmit: async (values: ProfileData) => {
      setIsLoading(true);
      try {
        if (
          values.accountID !== undefined &&
          values.email !== undefined &&
          values.phoneNumber !== undefined &&
          values.firstName !== undefined &&
          values.lastName !== undefined &&
          values.fullName !== undefined
        ) {
          if (values.email === profile?.email || isVerified) {
            await User.updateProfile({
              AccountID: values.accountID,
              Email: values.email,
              FullName: values.fullName,
              PhoneNumber: values.phoneNumber,
            });
            customToast({
              icon: <SuccessIcon />,
              description: "Cập nhật tài khoản thành công",
              duration: 3000,
            });
          }
        }
      } catch (error) {
        customToast({
          icon: <ErrorIcon />,
          description: "Cập nhật thông tin không thành công",
          duration: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    if (profile) {
      if (profile.fullName) {
        const names = profile.fullName.split(" ");
        formik.setValues({
          accountID: profile.accountID,
          email: profile.email,
          phoneNumber: profile.phoneNumber,
          username: profile.username,
          fullName: profile.fullName,
          firstName: names[0],
          lastName: names.slice(1).join(" "),
        });
      }
    }
  }, [profile]);

  useEffect(() => {
    formik.setFieldValue(
      "fullName",
      formik.values.firstName + " " + formik.values.lastName
    );
  }, [formik.values.firstName, formik.values.lastName]);

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

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const isFormEmpty = () => {
    return (
      !formik.values.username ||
      !formik.values.email ||
      !formik.values.firstName ||
      !formik.values.lastName ||
      !formik.values.phoneNumber ||
      !isVerified
    );
  };

  return (
    <>
      {isLoading || userLoading ? <Loading /> : null}
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Thông Tin Người Dùng</CardTitle>
          <CardDescription>Xem hoặc cập nhật thông tin của bạn</CardDescription>
        </CardHeader>
        <form onSubmit={handleOnSubmit}>
          <CardContent>
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
            <div className="grid grid-cols-2 gap-2">
              <div className="lg:col-span-1 col-span-2">
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
                        !(
                          formik.touched.email &&
                          !formik.errors.email &&
                          formik.values.email !== profile?.email
                        ) ||
                        otpLoading
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
                  {!isVerified &&
                  !(formik.touched.email && formik.errors.email) &&
                  !optInput ? (
                    <div className="text-gray-400 text-sm">
                      Bạn cần phải xác thực email trước khi bạn có thể thay đổi
                      email được
                    </div>
                  ) : (
                    <></>
                  )}
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
              </div>
              <div className="lg:col-span-1 col-span-2">
                <div className={`grid gap-2 text-mainBrown mt-3`}>
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
                <div className="grid gap-2 text-mainBrown mt-3">
                  <Label htmlFor="username">Tên Đăng Nhập</Label>
                  <Input
                    id="username"
                    type="text"
                    value={formik.values.username}
                    readOnly
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <div className="text-red-600 text-sm">
                      {formik.errors.username}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4 justify-center">
            <Button
              type="submit"
              className="bg-mainGreen hover:bg-mainDarkerGreen"
              disabled={isFormEmpty()}
            >
              Cập nhật
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
};

export default Profile;
