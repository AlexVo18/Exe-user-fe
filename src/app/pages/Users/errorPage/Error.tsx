import DonateButton from "@/app/components/button/DonateButton";
import { ChevronRight } from "lucide-react";

const Error = () => {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center flex-col gap-4 text-center">
      <div className="flex text-9xl  text-mainBrown items-center">
        <div>4</div>
        <img src="images/Logo_With_Name.svg" alt="Logo Img" className="h-28 mt-4 ml-2" />
        <div>4</div>
      </div>
      <div className="text-2xl font-bold">Ôi không, đã có lỗi xảy ra!</div>
      <div className="px-10">
        Có lẽ như Nuôi Cây đã không tìm được thứ mà bạn đang tìm kiếm rồi.
      </div>
      <DonateButton
        title="Quay về trang chủ"
        bgColor="bg-mainGreen"
        textColor="white"
        link="/"
        isDonate={false}
        icon={<ChevronRight />}
      />
    </div>
  );
};

export default Error;
