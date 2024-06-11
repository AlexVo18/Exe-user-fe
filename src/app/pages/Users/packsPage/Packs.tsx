import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { AuthContext } from "@/app/contexts/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Packs = () => {
  const { userInfo } = useContext(AuthContext);
  return (
    <div>
      <div className="h-[400px] bg-transparent">
        <img
          src="images/Banner_packs.jpg"
          alt="Banner"
          className="w-full object-cover h-[400px] absolute z-[1]"
        />
        <div className=" z-20 text-white h-full flex justify-center items-center">
          <div className="flex flex-col items-center justify-center">
            <div className="lg:mx-20 mx-10 cursor-default z-10 ">
              <div className="text-6xl font-semibold md:text-start text-center">
                ĐỒNG HÀNH NUÔI CÂY
              </div>
              <div className="flex mt-6 md:justify-start justify-center"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto my-10">
        <div className="grid grid-cols-4 gap-6">
          <Link
            to={userInfo ? "/user/donation" : "/login"}
            className=" col-span-4 sm:col-span-2 lg:col-span-1"
          >
            <Card className="hover:shadow-lg transition-shadow ">
              <CardHeader className="p-0">
                <img
                  src="/images/Card_1.jpg"
                  alt=""
                  className="rounded-t-lg h-[200px]"
                />
              </CardHeader>
              <CardContent>
                <div className="my-2 text-2xl font-bold text-mainGreen">
                  Từ thiện nuôi cây
                </div>
                <p>
                  Quyên góp vào dự án Nuôi Cây và nhận mã cây dùng để theo dõi
                  sự phát triển của cây xanh
                </p>
              </CardContent>
            </Card>
          </Link>
          <Card className=" col-span-4 sm:col-span-2 lg:col-span-1 flex justify-center items-center text-center">
            <CardContent className="flex justify-center flex-col items-center">
              <img src="images/Logo_With_Name.svg" alt="" className="w-40" />
              <p className="font-bold text-2xl">
                More Coming <span className="text-mainGreen">Soon</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Packs;
