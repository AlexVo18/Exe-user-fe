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
import { WarningIcon } from "@/app/components/toast/ToastIcons";
import customToast from "@/app/utils/customToast";
import User from "@/app/api/APIs/user";

const Profile = () => {
  const { userInfo, userLoading } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  

  useEffect(() => {}, []);

  const getProfile = async () => {
    try {
      if (userInfo) {
        const response = await User.getProfile(userInfo?.accountID);
        if (response) {

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
  return (
    <>
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Thông Tin Người Dùng</CardTitle>
          <CardDescription>Xem hoặc cập nhật thông tin của bạn</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Input placeholder="Store Name" />
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default Profile;
