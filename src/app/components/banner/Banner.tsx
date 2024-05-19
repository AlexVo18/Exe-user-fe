import React from "react";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import DonateButton from "../button/DonateButton";

const Banner = () => {
  return (
    <div className="h-[600px]">
      <img
        src="src\assets\Banner.jpg"
        alt="Banner.svg"
        className="w-full object-cover h-[600px] absolute -z-10"
      />
      <div className="grid md:grid-cols-2 z-10 text-white h-full">
        <div className="flex flex-col items-center justify-center">
          <div className="lg:mx-20 md:mx-10 xs:mx-20">
            <div className="text-4xl font-semibold cursor-default">
              ĐỒNG HÀNH CÙNG NUÔI CÂY
            </div>
            <div className="mt-6 text-xl">
              Chỉ với 1 hành động nhỏ, bạn đã giúp môi trường chúng ta trở
              nên tốt đẹp hơn. Hãy cùng chúng tôi chung tay góp phần tạo tên 1
              Việt Nam xanh hơn.
            </div>
            <div className="mt-6">
              <DonateButton
                title="QUYÊN GÓP"
                textColor="white"
                bgColor="bg-mainGreen"
                link={"/donation"}
                size="big"
              />
            </div>
          </div>
        </div>
        <div className="hidden"></div>
      </div>
    </div>
  );
};

export default Banner;
