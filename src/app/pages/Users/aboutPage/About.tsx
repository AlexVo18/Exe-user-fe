import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="mt-auto">
      <div className="container mx-auto">
        <div className="text-4xl font-semibold text-center text-mainBrown mt-10 mb-5">
          VỀ CHÚNG TÔI
        </div>
        <div className="flex justify-center items-center">
          <img
            src="src\assets\Logo_With_Name.svg"
            alt="Logo Img"
            className="w-60"
          />
        </div>
        <div className="xl:mx-40 lg:mx-20 my-10">
          <div className="">
            {/* <div className=" text-2xl font-semibold text-mainGreen">
              Nuôi Cây là ai ?
            </div> */}
            <p className=" mt-2">
              Nuôi Cây là dự án từ thiện trồng cây cộng đồng để góp phần phát
              triển cũng như bảo vệ những khu rừng xanh thân yêu của Việt Nam
              chúng ta
            </p>
          </div>
          <div className="">
            {/* <div className=" text-2xl font-semibold text-mainGreen mt-4">
              Về dự án
            </div> */}
            <p className="mt-2">
              Nuôi Cây không chỉ đơn thuần là việc trồng cây, mà nó còn mang ý
              nghĩa sâu xa về mặt tinh thần và sự phát triển của chúng ta sau
              này. Chúng tôi muốn mang những thông điệp đó đến với mọi miền đất
              nước. 1 đóng góp nhỏ cũng đã góp phần tạo nên 1 giá trị to lớn cho
              môi trường, vậy thì còn chần chờ gì nữa mà không cùng chúng tôi
              hoàn thành sứ mệnh đó.
            </p>
          </div>
          <div className="col-span-2 hidden">
            <div className=" text-2xl font-semibold text-center text-mainGreen">
              Đơn vị đồng hành
            </div>
            <p className="md:mt-6 mt-2"></p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
